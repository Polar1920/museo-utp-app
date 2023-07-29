import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { Data } from '../../data/data';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  articulos: any = [];
  categorias: any = [];

  constructor(private navCtrl: NavController, private data: Data, private platform: Platform, private location: Location) { }

  ngOnInit() {
    this.obtenerArticulos();
    this.obtenerArticulosCat();

    this.platform.backButton.subscribeWithPriority(0, () => {
      if (history.length > 1) {
        history.back();
      } else {
        const alert = document.createElement('ion-alert');
        alert.header = 'Cerrar aplicación';
        alert.message = '¿Está seguro que desea cerrar la aplicación?';
        alert.buttons = [
          {
            text: 'Cancelar',
            role: 'cancel'
          }, {
            text: 'Cerrar',
            handler: () => {
              console.log('El usuario intentó cerrar la aplicación.');
            }
          }
        ];
        document.body.appendChild(alert);
        alert.present();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  obtenerArticulos() {
    this.data.getArticulosAll().subscribe(
      (response) => {
        this.articulos = response;
        console.log(this.articulos);
      },
      (error) => {
        console.log('Error al obtener los articulos:', error);
      }
    );
  }

  obtenerArticulosCat() {
    this.data.getArticulosCat().subscribe(
      (response) => {
        this.categorias = response;
        console.log(this.categorias);
      },
      (error) => {
        console.log('Error al obtener las categorias:', error);
      }
    );
  }

  cargarArticulosPorCategoria(categoria: string) {
    this.data.getArticulosPorCategoria(categoria).subscribe(
      (response) => {
        this.articulos = response;
        console.log('Artículos cargados por categoría:', this.articulos);
      },
      (error) => {
        console.log('Error al cargar los artículos por categoría:', error);
      }
    );
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
        if (extension === 'jpg') {
          return foto.url;
        }
      }
    }
    return '../../assets/img/buho-logo.svg';
  }

  viewArticle(articulo: any) {
    localStorage.setItem('showby', 'tc');
    localStorage.setItem('articulo_id', articulo.id);
    this.navCtrl.navigateForward(['/articulo']);
  }

  viewInformation() {
    this.navCtrl.navigateForward(['/information']);
  }

}