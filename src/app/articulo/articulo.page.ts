import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.page.html',
  styleUrls: ['./articulo.page.scss'],
})
export class ArticuloPage implements OnInit {
  comentarios: any[] = [];
  nuevoComentario: string = "";

  @ViewChild('modal') 
  modal: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  
  openModal() {
    this.modal.present();
  }

  agregarComentario(nuevoComentario: string) {
    if (nuevoComentario.trim() === '') {
      return; // Evita agregar comentarios vacíos
    }
  
    const comentario = {
      contenido: nuevoComentario,
      usuario: {
        nombre: "Nombre del usuario" // Reemplaza "Nombre del usuario" con el nombre real obtenido de algún lugar
      }
    };
    console.log(comentario);
    this.comentarios.push(comentario);
    this.nuevoComentario = "";
  }

  goToNarracion(){
    this.router.navigate(['/narration']);
  }

  goToHistory() {
    this.router.navigate(['/history']);    
  }

}