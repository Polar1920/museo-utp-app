import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-narration',
  templateUrl: './narration.page.html',
  styleUrls: ['./narration.page.scss'],
})
export class NarrationPage implements OnInit {

  conversacion: { emisor: boolean, mensaje: string }[] = [];
  mensajes: string[] = [
    'Sí, son conocidas por su apariencia y su sistema operativo intuitivo.',
    'Una de las cosas destacadas de las Macintosh es su interfaz gráfica fácil de usar.',
    '¡Eso es genial! Me encanta su diseño.',
  ];
  mensajeActual: number = 0; 
  @ViewChild('conversacionesContainer', { static: false })
  conversacionesContainer!: ElementRef;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    // Mensajes inicial
    this.agregarMensajeInicial(true, 'La Apple Macintosh es reconocida por su diseño elegante y facilidad de uso.');
    this.agregarMensajeInicial(false, 'Sí, son conocidas por su apariencia y su sistema operativo intuitivo.');
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
