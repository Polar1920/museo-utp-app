import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Data } from '../data/data';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.page.html',
  styleUrls: ['./account-edit.page.scss'],
})
export class AccountEditPage implements OnInit {

  usuario: any; // Definir la propiedad "usuario"

  isNameEditing: boolean = false;
  isApellidoEditing: boolean = false;
  isCedulaEditing: boolean = false;

  constructor(private router: Router, private navCtrl: NavController, private data: Data) { }

  ngOnInit() {
    // Obtener el objeto de usuario del localStorage
    let usuarioString = localStorage.getItem('usuario');

    if (usuarioString !== null) {
      this.usuario = JSON.parse(usuarioString);
    }
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

  cancelApellidoEditing() {
    this.isNameEditing = false;
  }

  saveName() {
    this.isNameEditing = false;
    // Aquí podrías guardar el nombre editado en una base de datos o hacer cualquier otra acción necesaria.
  }

  saveApellido() {
    this.isApellidoEditing = false;
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
