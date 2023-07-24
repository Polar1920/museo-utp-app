import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../data/data';
import Navigation from 'swiper';
//import * as internal from 'stream';
//import { environment } from 'src/environments/environment';
//import { HttpClient } from '@angular/common/http';
//import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  //host: string = environment.apiBaseUrl;

  name: string = '';
  username: string = '';
  lastName: string = '';
  cedula: string = '';
  level: number = 0;
  foto: string = '';
  password: string = '';
  passwordRepet: string = '';
  showPassword: boolean = false;
  showPassword2: boolean = false;
  selectedFacultad: number = 0;
  selectedCarrera: number = 0;
  highlightLabelFlag: boolean = false;
  carreras: any = [];
  facultades: any = [];



  constructor(private router: Router, private data: Data) { }


  ngOnInit() {
    this.obtenerCarreras();
    this.obtenerFacultades();

  }
  obtenerCarreras() {
    this.data.getCarreras().subscribe(
      (response) => {
        this.carreras = response;
        console.log(this.carreras);
      },
      (error) => {
        console.log('Error al obtener las carreras:', error);
      }
    );
  }

  obtenerFacultades() {
    this.data.getFacultades().subscribe(
      (response) => {
        this.facultades = response;
        console.log(this.facultades);
      },
      (error) => {
        console.log('Error al obtener las facultades:', error);
      }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibility2() {
    this.showPassword2 = !this.showPassword2;
  }

  submitRegister() {
    console.log('Datos del registro: Nombre:', this.name, this.lastName, this.selectedFacultad, this.selectedCarrera, this.password, this.passwordRepet);
    this.data.registerUser(this.username, this.password, this.name, this.lastName, this.cedula, this.level, this.selectedFacultad, this.selectedCarrera, this.foto).subscribe(
      (response) => {
        // Manejar la respuesta del servidor en caso de éxito
        console.log('Registro exitoso:', response);
        alert('Registro exitoso.');
        this.goToLogin();
        // Redirigir al usuario a la página de inicio de sesión
      },
      (error) => {
        // Manejar cualquier error que se produzca
        console.log('Error en el registro:', error);
        alert('Error en el registro.');
      }
    );
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
