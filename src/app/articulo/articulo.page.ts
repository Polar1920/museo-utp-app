import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.page.html',
  styleUrls: ['./articulo.page.scss'],
})
export class ArticuloPage implements OnInit {
  comentarios: any[] = [];
  nuevoComentario: string = "";

  constructor() { }

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
  

  

}
