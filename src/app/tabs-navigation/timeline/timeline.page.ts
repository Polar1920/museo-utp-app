import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from '../../data/data';
import Swiper from 'swiper';
import { Location } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {

  articulos: any = [];
  swiper: Swiper | undefined;
  reload: boolean = false;

  constructor(private data: Data, private location: Location, private dataService: DataService) { }

  ngOnInit() {
    this.obtenerArticulos();
    //this.inicializarSwiper();
    /*
    if(this.reload != true){
      this.reload = true;
      
      window.location.reload(); // recargar la página
    }*/
  }

  // NUEVO MANEJO DE DATOS
  obtenerArticulos() {
    // Obtener los datos de IndexedDB
    console.log('Obtener los articulos de IndexedDB');
    this.dataService.getArticulosFromIndexedDB().then(
      (response) => {
        if (response.length > 0) {
          // Si hay datos en IndexedDB, utilizarlos
          this.articulos = response;
          console.log('Articulos obtenidos de IndexedDB:');
          console.log(response);
        } else {
          console.log('No hay Datos en IndexedDB');
        }
      },
      (error) => {
        console.log('Error al obtener los articulos:', error);
      }
    );
  }

  inicializarSwiper() {
    this.swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination'
      },
    });
  }

  swiperSlideChanged(e: any) {
    console.log('changed', e);
  }

  getPhotoUrl(article: any): string {
    if (article.fotos && article.fotos.length > 0) {
      for (const foto of article.fotos) {
        const url = foto.url;
        const urlParts = url.split('/');
        const urlPartEnd = urlParts[urlParts.length - 1];
        const urlPartEndParts = urlPartEnd.split('?');
        const fileName = urlPartEndParts[0];
        const extension = fileName.split('.')[1];
        if (extension === 'jpg') {
          return foto.url;
        }
      }
    }
    return '../../assets/img/buho-logo.svg';
  }

  getLimitedDescription(description: string, maxLength: number):string{
    if(description && description.length > maxLength ){
      return description.substring(0, maxLength) + '...';
    }
    return description;
  }
}