import { Component, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
 
  constructor() { }

  ngOnInit() {
  }
  
  swiperSlideChanged(e: any) {
    console.log('changed', e)
  }



  


}