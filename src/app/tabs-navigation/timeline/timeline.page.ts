import { Component, OnInit } from '@angular/core';

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

  getRenderBullet(index: number, className: string) {
    return '<span"' + className + '">' + (index + 1) + "</span>";
  }

}