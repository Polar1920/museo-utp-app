import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-narration',
  templateUrl: './narration.page.html',
  styleUrls: ['./narration.page.scss'],
})
export class NarrationPage implements OnInit {
  titulo: any;
  categoria: any;
  year: any;
  foto: any;
  conversaciones: any[] = [];
  private audioActual: HTMLAudioElement | null = null;

  conversacion: { emisor: boolean, mensaje: string }[] = [];
  mensajes: string[] = [];
  mensajeActual: number = 0;
  @ViewChild('conversacionesContainer', { static: false })
  conversacionesContainer!: ElementRef;

  // Agrega esta propiedad para almacenar los URLs ordenados de los audios
  orderedAudioUrls: string[] = [];

  constructor(
    private navCtrl: NavController,
    private http: HttpClient // Agregar el servicio HttpClient
  ) { }

  ngOnInit() {
    // Obtener el artículo ID del almacenamiento local (localStorage)
    const articulo_id = localStorage.getItem('articulo_id');

    // Verificar si hay un ID de artículo válido
    if (articulo_id) {
      // Obtener datos de la API utilizando el ID de artículo
      const apiURL = `https://ds6.glaciar.club/api/articulos/${articulo_id}`;
      this.http.get<any>(apiURL).subscribe(data => {
        // Asignar los datos de la API a las propiedades correspondientes
        this.titulo = data.nombre;
        this.foto = data.fotos[0].url;
        this.categoria = data.categoria_id; // Dependiendo de cómo se llame en la respuesta de la API
        this.year = new Date(data.created_at).getFullYear(); // Obtener el año desde la fecha de creación
        this.mensajes = data.descripcion.split('*')[1].split('|');

        // Ordenar los URLs de los audios por el número de conversación
        if (data.audios && data.audios.length > 0) {
          this.orderedAudioUrls = data.audios
            .sort((a: any, b: any) => {
              const numeroConversacionA = parseInt(a.url.split('conv-')[1].split('.')[0]);
              const numeroConversacionB = parseInt(b.url.split('conv-')[1].split('.')[0]);
              return numeroConversacionA - numeroConversacionB;
            })
            .map((audio: any) => audio.url);

          this.orderedAudioUrls.forEach((audioUrl, index) => {
            setTimeout(() => {
              // Creamos una nueva instancia del objeto Audio
              const nuevoAudio = new Audio(audioUrl);
              nuevoAudio.load();

              // Actualizamos la referencia al objeto Audio actual
              this.audioActual = nuevoAudio;
            }, index * 3000); // Espera 3 segundos entre la reproducción de cada audio (puedes ajustar el tiempo según lo desees)
          });
        }
      });
    } else {
      // Manejar el caso en que no hay un ID de artículo válido
      console.error('ID de artículo no encontrado en el almacenamiento local.');
    }
  }

  reproducirAudio(audioUrl: string) {
    // Si hay una instancia anterior del objeto Audio, la pausamos y liberamos
    if (this.audioActual) {
      this.audioActual.pause();
      this.audioActual = null;
    }

    // Creamos una nueva instancia del objeto Audio y la asignamos al atributo audioActual
    this.audioActual = new Audio(audioUrl);
    this.audioActual.load();
    this.audioActual.play();

    // Desplazar el scroll para mostrar el mensaje recién agregado
    this.scrollDown();
    // Desplazar automáticamente después de un breve retraso
    setTimeout(() => this.scrollDownAutomatically(), 100);
  }

  reproducirSiguienteAudio() {

    if (this.mensajeActual < this.orderedAudioUrls.length) {
      if (this.audioActual) {
        this.audioActual.pause();
        this.audioActual = null;
        const audioUrl = this.orderedAudioUrls[this.mensajeActual];
        this.reproducirAudio(audioUrl);
        //this.mensajeActual++;
      }
      else {
        const audioUrl = this.orderedAudioUrls[this.mensajeActual];
        this.reproducirAudio(audioUrl);
      }
    }
  }

  agregarMensaje() {
    if (this.mensajeActual < this.mensajes.length) {
      const mensaje = this.mensajes[this.mensajeActual];
      const emisor = this.mensajeActual % 2 === 0; // Alterna entre emisor y receptor en cada mensaje
      this.conversacion.push({ emisor, mensaje });
      this.mensajeActual++;
      // Desplazar el scroll para mostrar el mensaje recién agregado
      this.scrollDown();
      // Desplazar automáticamente después de un breve retraso
      setTimeout(() => this.scrollDownAutomatically(), 100);
    }
  }


  scrollDown() {
    const element = document.getElementById('contenedor-conversaciones');
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }

  scrollDownAutomatically() {
    const element = this.conversacionesContainer.nativeElement;
    const lastMessage = element.lastElementChild;
    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  navegarAtras() {
    this.navCtrl.back();
  }

  hayMensajesPorAgregar() {
    return this.mensajeActual < this.mensajes.length;
  }

  ngOnDestroy() {
    // Antes de que el componente se destruya, asegurémonos de pausar y liberar el recurso de audio.
    if (this.audioActual) {
      this.audioActual.pause();
      this.audioActual = null;
    }
  }
}
