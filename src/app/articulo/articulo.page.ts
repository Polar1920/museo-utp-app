import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../data/data';
import { HttpClient,HttpHeaders  } from '@angular/common/http';


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.page.html',
  styleUrls: ['./articulo.page.scss'],
})
export class ArticuloPage implements OnInit {
  @ViewChild('informacionContainer', { static: false })
  informacionContainer!: ElementRef;
  articulo: any;
  primeraFoto: any;

  mostrarImagen: boolean = true;
  imagenUrl: string = '../../assets/img/Foto.jpeg'; 
  
  articuloId: number | null=null;
  comentarios: any[] = [];
  nuevoComentario: string = "";

  @ViewChild('modal')
  modal: any;

  constructor(private router: Router, private data: Data,private http: HttpClient) { }

  async ngOnInit() {
    await this.cargarArticulo();
    
    
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
            //this.data.presentAlert('articulo obtenido de api', this.articulo);
          },
          (error) => {
            //this.data.presentAlert('Error al obtener articulo de api' , error);
          }
        );
      } else { // De lo contrario, usar getArticuloID
        this.data.getArticuloID(articulo_id.toString()).subscribe(
          (response) => {
            this.articulo = response;
            localStorage.setItem('articulo', this.articulo);
            //this.data.presentAlert('articulo obtenido de api', this.articulo);
          },
          (error) => {
            //this.data.presentAlert('Error al obtener articulo de api' , error);
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
            "url": "../../assets/img/iPhone.jpeg",
            "tipo": "imagen"
          }
        ],
        "videos": [],
        "audios": []
      };
      //this.data.presentAlert("articulo en local", this.articulo.toString());
    } else {
      console.log("existe");
      //this.data.presentAlert("articulo existe en api", articuloString);
      this.articulo = articuloString;//localStorage.getItem('articulo');
      //this.data.presentAlert("objeto generado", this.articulo);
      
      if (this.articulo.fotos[0] == null) { this.articulo.fotos[0] = "../../assets/img/iPhone.jpeg" }
    }
    await this.cargarComentarios();
  }

  async openModal() {
    await this.cargarComentarios();
    this.modal.present();
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


  
  cargarComentarios() {
    if (this.articuloId === null) {
      console.error('El artículoId es nulo. Asegúrate de cargar el artículo antes de los comentarios.');
      return;
    }

    const apiUrl = `https://ds6.glaciar.club/api/comentarios/${this.articuloId}`;

    this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        this.comentarios = response;
      },
      (error) => {
        console.error('Error al obtener los comentarios:', error);
      }
    );
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
    this.router.navigate(['/history']);
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

}