import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../data/data';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  remember: boolean = false;
  rememberChecked: boolean = false;

  articulos: any;
  categorias: any;

  constructor(private router: Router, private data: Data, private dataService: DataService) { }

  ngOnInit() {
    this.obtenerArticulosDelAPI();
    let rememberString = localStorage.getItem('remember');
    if (rememberString !== null) {
      this.rememberChecked = JSON.parse(rememberString);
    }
    let user = localStorage.getItem('log_nombre_usuario');
    this.username = user ?? '';
    let pass = localStorage.getItem('log_password');
    this.password = pass ?? '';
    this.obtenerArticulos();
  }

  checkBoxChanged(event: any) {
    if (event.detail.checked) {
      this.remember = true;
      localStorage.setItem('remember', JSON.stringify(this.rememberChecked));
    } else {
      this.remember = false;
      localStorage.removeItem('remember');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submitLogin() {
    if (this.username && this.password) {
      if (this.remember == true) {
        this.data.reUser(this.username, this.password);
      } else {
        this.data.noReUser();
      }

      this.data.loginUser(this.username, this.password).subscribe(
        (response) => {
          // Manejar la respuesta del servidor en caso de éxito
          let jsonString = JSON.stringify(response);
          let resp = JSON.parse(jsonString);

          // Acceder al token
          let token = resp.token;

          // Acceder al objeto de usuario
          let usuario = resp.usuario;

          if (usuario.rol == "ESTUD") {
            if (usuario.foto == null) { usuario.foto = "../../../assets/img/foto_perfil.jpg" }
            console.log(usuario.foto);
            let usuarioString = JSON.stringify(usuario);
            // Guardar el objeto de usuario en el localStorage
            localStorage.setItem('usuario', usuarioString);
            localStorage.setItem('token', token);
            // Redirigir al usuario a la página de Home
            this.router.navigate(['/tabs']);
          } else {
            alert('Usuario sin acceso al App: ' + usuario.rol);
          }

        },
        (error) => {
          // Manejar cualquier error que se produzca
          console.log('Error en el Login:', error.error.msg);
          alert(error.error.msg);
        }
      );
    }
    else
      alert("Por favor, ingrese el usuario y la contraseña.")
  }

  goToPasswordRecovery() {
    this.router.navigate(['/password-recovery']);
  }

  goToRegistration() {
    this.data.getUsers().subscribe((data) => {
      console.log(data);
    });
    this.router.navigate(['/register']);
  }

  // NUEVO MANEJO DE DATOS
  obtenerArticulos() {
    // Obtener los datos de IndexedDB
    console.log('Obtener los articulos de IndexedDB');
    this.dataService.getArticulosFromIndexedDB().then(
      (response) => {
        if (response.length > 0) {
          // Si hay datos en IndexedDB, utilizarlos
          this.articulos = response;
          console.log('Articulos obtenidos de IndexedDB:');
          console.log(response);
        } else {
          console.log('No hay Datos en IndexedDB');
        }
      },
      (error) => {
        console.log('Error al obtener los articulos:', error);
      }
    );
  }

  // Obtener los datos de API y guardarlos IndexedDB
  obtenerArticulosDelAPI() {
    // Obtener los datos de IndexedDB
    console.log('Obtener los datos de IndexedDB');
    // Si no hay datos en IndexedDB, obtenerlos de la API
    this.dataService.getArticulosAll().subscribe(
      (response) => {
        this.articulos = response;
        console.log('Datos obtenidos de la API y Guardados en indexedDB');
      },
      (error) => {
        console.log('Error al obtener los articulos:', error);
      }
    );
  }

}