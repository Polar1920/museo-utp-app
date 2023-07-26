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

  editarNombre: boolean = false;
  editarApellido: boolean = false;
  editarCedula: boolean = false;
  editarNivel: boolean = false;
  editarFacultad: boolean = false;
  editarCarrera: boolean = false;

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

  /* NOMBRE */
  enableNameEdt = () => this.editarNombre = true;
  cancelNameEdt = () => this.editarNombre = false;

  saveName() {
    this.editarNombre = false;
    // Aquí podrías guardar el nombre editado en una base de datos o hacer cualquier otra acción necesaria.
  }


  /* APELLIDO */
  enableApellidoEdt = () => this.editarApellido = true;  
  cancelApellidoEdt = () => this.editarApellido = false;
  
  saveApellido() {
    this.editarApellido = false;
    // Aquí podrías guardar el nombre editado en una base de datos o hacer cualquier otra acción necesaria.
  }

  /* CEDULA */
  enableCedulaEdt = () => this.editarCedula = true;  
  cancelCedulaEdt = () => this.editarCedula = false;

  saveCedula() {
    this.editarCedula = false;
    // Aquí podrías guardar la cédula editada en una base de datos o hacer cualquier otra acción necesaria.
  }

  /* NIVEL */
  enableNivelEdt = () => this.editarNivel = true;  
  cancelNivelEdt = () => this.editarNivel = false;

  saveNivel() {
    this.editarNivel = false;
    // Aquí podrías guardar la cédula editada en una base de datos o hacer cualquier otra acción necesaria.
  }

    /* FACULTAD */
    enableFacultadEdt = () => this.editarFacultad = true;  
    cancelFacultadEdt = () => this.editarFacultad = false;
  
    saveFacultad() {
      this.editarFacultad = false;
      // Aquí podrías guardar la cédula editada en una base de datos o hacer cualquier otra acción necesaria.
    }

    /* CARRERA */
    enableCarreraEdt = () => this.editarCarrera = true;  
    cancelCarreraEdt = () => this.editarCarrera = false;
  
    saveCarrera() {
      this.editarCarrera = false;
      // Aquí podrías guardar la cédula editada en una base de datos o hacer cualquier otra acción necesaria.
    }
}
