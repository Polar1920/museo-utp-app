import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../data/data';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.page.html',
  styleUrls: ['./articulo.page.scss'],
})
export class ArticuloPage implements OnInit {
  articulo: any;
  primeraFoto: any;

  comentarios: any[] = [];
  nuevoComentario: string = "";

  @ViewChild('modal')
  modal: any;

  constructor(private router: Router, private data: Data) { }

  ngOnInit() {
    this.cargarArticulo();
  }

  ionViewWillEnter() {
    this.cargarArticulo();
  }

  ionViewDidEnter() {
    this.cargarArticulo();
  }

  cargarArticulo() {
    let articulo_id = localStorage.getItem('articulo_id');

    if(articulo_id != null){
      this.data.getArticuloQR(articulo_id.toString()).subscribe(
        (response) => {
          this.articulo = response;
          localStorage.setItem('articulo', this.articulo);
          this.data.presentAlert('articulo obtenido de api', this.articulo);
        },
        (error) => {
          this.data.presentAlert('Error al obtener articulo de api' , error);
        }
      );
    }

    let articuloString = localStorage.getItem('articulo');
    console.log("ejecutando carga de articulo");
    if (!articuloString || articuloString == null || articuloString === '' || articuloString === 'null') {
      console.log("no existe");
      this.articulo = {
        "id": 999,
        "nombre": "Lorem ipsum",
        "categoria": "Lorem ipsum",
        "descripcion": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu commodo mi. Vestibulum ut ante id elit dignissim sollicitudin. Sed et quam vel nisl maximus sollicitudin. Nullam eget sem at nisl dapibus vulputate. Sed placerat lacus in velit pharetra, vel pulvinar quam facilisis.",
        "ubicacion": "Lorem ipsum",
        "dueno": "Lorem ipsum",
        "year": 1000,
        "created_at": "2023-07-24T01:29:31.000Z",
        "updated_at": "2023-07-24T01:29:31.000Z",
        "fotos": [
          {
            "id_multimedio": 1,
            "url": "../../assets/img/iPhone.jpeg",
            "tipo": "imagen"
          }
        ],
        "videos": [],
        "audios": []
      };
      this.data.presentAlert("articulo en local", this.articulo.toString());
    } else {
      console.log("existe");
      this.data.presentAlert("articulo existe en api", articuloString);
      this.articulo = articuloString;//localStorage.getItem('articulo');
      this.data.presentAlert("objeto generado", this.articulo);
      
      if (this.articulo.fotos[0] == null) { this.articulo.fotos[0] = "../../assets/img/iPhone.jpeg" }
    }
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

  goToNarracion() {
    this.router.navigate(['/narration']);
  }

  goToHistory() {
    this.router.navigate(['/history']);
  }

}