import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from '../../data/data';
import { IonicSlides } from '@ionic/angular';
import Swiper from 'swiper';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {

  articulos: any = [];
  swiper: Swiper | undefined;

  constructor(private data: Data) { }

  ngOnInit() {
    this.obtenerArticulos();
  }

  obtenerArticulos() {
    this.data.getArticulosTimeLine().subscribe(
      (response) => {
        this.articulos = response;
        console.log(this.articulos);
        this.inicializarSwiper();
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