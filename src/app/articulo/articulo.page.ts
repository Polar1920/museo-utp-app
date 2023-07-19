import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.page.html',
  styleUrls: ['./articulo.page.scss'],
})
export class ArticuloPage implements OnInit {
  comentarios: any[] = [];
  nuevoComentario: string = "";

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
  }

  agregarComentario(nuevoComentario: string) {
    const comentario = {
      contenido: nuevoComentario,
      usuario: {
        nombre: "Nombre del usuario" // Reemplaza "Nombre del usuario" con el nombre real obtenido de algún lugar
      }
    };
    this.comentarios.push(comentario);
    this.nuevoComentario = "";
  }


  goHome(){
    this.navCtrl.navigateForward('/home');
  }
  

  

}
