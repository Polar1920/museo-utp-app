import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  regresar() {
    this.navCtrl.back(); // Navegar a la página anterior
  }

}
