import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../data/data';
import { Platform, NavController } from '@ionic/angular';
//import Navigation from 'swiper';

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
  errors: string[] = [];

  //para mostrar la segunda parte del form
  mostrarSegundaParte = false;

  mostrarSegundaParteForm() {
    if (this.username.length < 4) {
      alert('El nombre de usuario debe tener al menos 4 caracteres.');
    } else if (this.name.length < 4) {
      alert('Llene nombre correctamente.');
    } else if (this.lastName.length < 4) {
      alert('Llene apellido correctamente.');
    } else if (this.cedula.length < 7) {
      alert('Cédula - Error de formato.');
    } else {
      this.mostrarSegundaParte = true;
    }
  }

  regresarPrimeraParte() {
    this.mostrarSegundaParte = false;
  }


  constructor(private router: Router, private data: Data, private platform: Platform, private navController: NavController) { }


  ngOnInit() {
    this.obtenerFacultades();

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navController.pop();
    });
  }

  obtenerCarreras(selectedFacultad: number) {
    this.data.getCarrerasfacultad(selectedFacultad).subscribe(
      (response) => {
        this.carreras = response;
        console.log(this.carreras);
        const carrerasAsString = JSON.stringify(response);
        console.log(carrerasAsString);
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
    if (this.level === 0) {
      alert('Debe seleccionar un nivel.');
      return;
    } else if (this.selectedFacultad === 0) {
      alert('Debe seleccionar una facultad.');
      return;
    } else if (this.selectedCarrera === 0) {
      alert('Debe seleccionar una carrera.');
      return;
    } else if (this.password !== this.passwordRepet) {
      alert('Las contraseñas no coinciden.');
      return;
    } else {
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
          console.log('Error en el Registro:', error);
          let errorMessage = 'Se produjo un error al registrar al usuario.';
          errorMessage += '\n';
          for (let i = 0; i < error.error.errors.length; i++) {
            errorMessage += error.error.errors[i].msg + '\n';
          }
          setTimeout(() => {
            alert(errorMessage);
          }, 0);
        }
      );
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
