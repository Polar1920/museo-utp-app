import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-integrantes',
  templateUrl: './integrantes.page.html',
  styleUrls: ['./integrantes.page.scss'],
})
export class IntegrantesPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  regresar() {
    this.navCtrl.back(); // Navegar a la página anterior
  }

  buttonClicked(){
    
  }

}
