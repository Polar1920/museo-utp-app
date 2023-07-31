import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../data/data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import Swiper from 'swiper';

interface Foto {
  id: number;
  url: string;
  tipo: string;
}

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.page.html',
  styleUrls: ['./articulo.page.scss'],
})
export class ArticuloPage implements OnInit {
  swiper: Swiper | undefined;

  @ViewChild('informacionContainer', { static: false })
  informacionContainer!: ElementRef;
  articulo: any;
  articuloDescConv: any;
  fotos: any[] = [];

  mostrarImagen: boolean = true;
  imagenUrl: string = '../../assets/img/Negro.jpg';

  articuloId: number | null = null;

  descripcion: any[] = [];
  conversaciones: any[] = [];

  comentarios: any[] = [];
  nuevoComentario: string = "";

  usuario: any; // Definir la propiedad "usuario"

  @ViewChild('modal')
  modal: any;

  constructor(private navCtrl: NavController, private router: Router, private data: Data, private http: HttpClient, private location: Location) { }

  async ngOnInit() {
    await this.cargarArticulo();
    // Obtener el objeto de usuario del localStorage
    let usuarioString = localStorage.getItem('usuario');

    if (usuarioString !== null) {
      this.usuario = JSON.parse(usuarioString);
    }
    //this.inicializarSwiper();
  }

  goBack() {
    this.router.navigate(['/tabs/home']);
    //this.location.back();
  }

  async ionViewWillEnter() {
    this.cargarArticulo();
  }

  async ionViewDidEnter() {
    this.cargarArticulo();
  }

  async cargarArticulo() {
    // Mostrar la imagen por 1 segundo
    this.mostrarImagen = true;
    setTimeout(() => {
      this.mostrarImagen = false;
    }, 1000);

    let articulo_id = localStorage.getItem('articulo_id');

    if (articulo_id != null) {
      this.articuloId = +articulo_id;

      if (this.articuloId != null) {
        const showby = localStorage.getItem('showby');

        if (showby === 'qr') { // Si el valor es "qr"
          this.data.getArticuloQR(articulo_id.toString()).subscribe(
            (response) => {
              this.articulo = response;
              localStorage.setItem('articulo', this.articulo);
              localStorage.setItem('articuloDescConv', this.articulo.descripcion);

              localStorage.setItem('narTitulo', this.articulo.nombre);
              localStorage.setItem('narCategoria', this.articulo.categoria);
              localStorage.setItem('narYear', this.articulo.year);

              const fotosOBJ: Foto[] = this.articulo.fotos;

              this.fotos = fotosOBJ.map(foto => foto.url);

              if (this.fotos[0] == null) { this.fotos[0] = "../../assets/img/buho-logo.svg" }
              localStorage.setItem('narFoto', this.fotos[0]);
            },
            (error) => {
              this.data.presentAlert('Error al obtener articulo de api', error);
            }
          );
        } else { // De lo contrario, usar getArticuloID
          this.data.getArticuloID(articulo_id.toString()).subscribe(
            (response) => {
              this.articulo = response;
              localStorage.setItem('articulo', this.articulo);
              localStorage.setItem('articuloDescConv', this.articulo.descripcion);

              localStorage.setItem('narTitulo', this.articulo.nombre);
              localStorage.setItem('narCategoria', this.articulo.categoria);
              localStorage.setItem('narYear', this.articulo.year);

              const fotosOBJ: Foto[] = this.articulo.fotos;

              this.fotos = fotosOBJ.map(foto => foto.url);

              if (this.fotos[0] == null) { this.fotos[0] = "../../assets/img/buho-logo.svg" }
              localStorage.setItem('narFoto', this.fotos[0]);
            },
            (error) => {
              this.data.presentAlert('Error al obtener articulo de api', error);
            }
          );
        }
      }
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
            "url": "../../assets/img/buho-logo.svg",
            "tipo": "imagen"
          }
        ],
        "videos": [],
        "audios": []
      };
    } else {
      console.log("existe");

      this.articulo = articuloString;

      localStorage.setItem('conversaciones', this.descripcion[1]);

      this.descripcion = localStorage.getItem('articuloDescConv')?.split('*') || [];
    }

    console.log(this.fotos);

    console.log(this.fotos[0]);
    console.log(this.fotos[1]);
    console.log(this.fotos[2]);

    await this.cargarComentarios();
  }

  async openModal() {
    await this.cargarComentarios();
    this.modal.present();
  }

  cargarComentarios() {
    const id = localStorage.getItem('articulo_id');
    if (id === null) {
      console.error('El artículoId es nulo. Asegúrate de cargar el artículo antes de los comentarios.');
      return;
    } else {
      const apiUrl = `https://ds6.glaciar.club/api/comentarios/${id}`;

      this.http.get<any[]>(apiUrl).subscribe(
        (response) => {
          this.comentarios = response;
          console.log(this.comentarios);
        },
        (error) => {
          console.error('Error al obtener los comentarios:', error);
        }
      );
    }
  }

  agregarComentario() {
    if (!this.nuevoComentario.trim()) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se ha proporcionado un token de sesión válido.');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': token
    });

    const body = {
      comentario: this.nuevoComentario
    };

    this.http.post<any>(`https://ds6.glaciar.club/api/comentarios/${this.articuloId}`, body, { headers }).subscribe(
      (response) => {
        console.log('Comentario agregado:', response);

        // Agregar el nuevo comentario a la lista local de comentarios
        this.comentarios.push(response);

        // Limpiar el campo de nuevoComentario después de agregarlo con éxito
        this.nuevoComentario = "";
      },
      (error) => {
        console.error('Error al agregar el comentario:', error);
      }
    );
  }

  goToNarracion() {
    this.router.navigate(['/narration']);
  }

  goToHistory() {
    this.router.navigate(['/history'], { queryParams: { nombre: this.articulo.nombre, videoUrl: this.articulo.videos[0]?.url } });
  }
  scrollDown() {
    const element = document.getElementById('contenedor-informacion');
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }
  scrollDownAutomatically() {
    const element = this.informacionContainer.nativeElement;
    const lastMessage = element.lastElementChild;
    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  getPhotoUrl(article: any): string {
    if (article.fotos && article.fotos.length > 0) {
      for (const foto of article.fotos) {
        const url = foto.url;
        const urlParts = url.split("/");
        const urlPartEnd = urlParts[urlParts.length - 1];
        const urlPartEndParts = urlPartEnd.split("?");
        const fileName = urlPartEndParts[0];
        const extension = fileName.split(".")[1];
        if (extension === 'png') {
          return foto.url;
        }
      }
    }
    return '../../assets/img/buho-logo.svg';
  }

  
}