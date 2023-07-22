import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  regresar() {
    this.navCtrl.back(); // Navegar a la página anterior
  }

}