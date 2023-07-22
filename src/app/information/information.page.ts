import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  constructor(private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
  }

  regresar() {
    this.navCtrl.back(); // Navegar a la página anterior
  }

  goToTutorial() {
    this.router.navigate(['/tutorial']);
  }

  goToProyecto() {
    this.router.navigate(['/proyecto']);
  }

  goToIntegrantes() {
    this.router.navigate(['/integrantes']);
  }

}
