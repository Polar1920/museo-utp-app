import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  nombreArticulo: string = '';
  videoUrl: string = '';

  constructor(private navCtrl: NavController, private route: ActivatedRoute) { }

  ngOnInit() {
    // Get the query parameters from the activated route
    this.route.queryParams.subscribe(params => {
      this.nombreArticulo = params['nombre'];
      this.videoUrl = params['videoUrl'];
    });
  }

  goBack() {
    this.navCtrl.navigateBack('/articulo');
  }

}
