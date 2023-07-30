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

  conversacion: { emisor: boolean, mensaje: string }[] = [];
  mensajes: string[] = [];

  mensajeActual: number = 0;
  @ViewChild('conversacionesContainer', { static: false })
  conversacionesContainer!: ElementRef;

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

      });
    } else {
      // Manejar el caso en que no hay un ID de artículo válido
      console.error('ID de artículo no encontrado en el almacenamiento local.');
    }
  }

  agregarMensajeInicial(emisor: boolean, mensaje: string) {
    this.conversacion.push({ emisor, mensaje });
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
}
