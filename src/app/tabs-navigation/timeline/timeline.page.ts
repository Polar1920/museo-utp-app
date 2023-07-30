import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from '../../data/data';
import Swiper from 'swiper';
import { Location } from '@angular/common';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {

  articulos: any = [];
  swiper: Swiper | undefined;
  reload: boolean = false;

  constructor(private data: Data, private location: Location) { }

  ngOnInit() {
    this.obtenerArticulos();
    this.inicializarSwiper();
    /*
    if(this.reload != true){
      this.reload = true;
      
      window.location.reload(); // recargar la página
    }*/
  }

  obtenerArticulos() {
    this.data.getArticulosTimeLine().subscribe(
      (response) => {
        this.articulos = response;
        console.log(this.articulos);
      },
      (error) => {
        console.log('Error al obtener los articulos:', error);
      }
    );
  }

  inicializarSwiper() {
    this.swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
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
}