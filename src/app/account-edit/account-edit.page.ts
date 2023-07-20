import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.page.html',
  styleUrls: ['./account-edit.page.scss'],
})
export class AccountEditPage implements OnInit {

  name: string = 'Juan Zamora';
  cedula: string = '8-987-2235';
  isNameEditing: boolean = false;
  isCedulaEditing: boolean = false;

  constructor(private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
  }

  goToBack() {
    this.navCtrl.back();
  }

  enableNameEditing() {
    this.isNameEditing = true;
  }

  cancelNameEditing() {
    this.isNameEditing = false;
  }

  saveName() {
    this.isNameEditing = false;
    // Aquí podrías guardar el nombre editado en una base de datos o hacer cualquier otra acción necesaria.
  }

  enableCedulaEditing() {
    this.isCedulaEditing = true;
  }

  cancelCedulaEditing() {
    this.isCedulaEditing = false;
  }

  saveCedula() {
    this.isCedulaEditing = false;
    // Aquí podrías guardar la cédula editada en una base de datos o hacer cualquier otra acción necesaria.
  }

}
