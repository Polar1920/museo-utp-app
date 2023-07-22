import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../data/data';
import { User } from '../data/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private router: Router, private data: Data) { }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submitLogin() {
    if(this.username && this.password){
      console.log('Datos del login:', this.username, this.password);
      //this.router.navigate(['/tabs/home']);
      this.data.loginUser(this.username,this.password).subscribe(
        (response) => {
          // Manejar la respuesta del servidor en caso de éxito
          console.log('Login exitoso:', response);
          // Redirigir al usuario a la página de inicio de sesión
        },
        (error) => {
          // Manejar cualquier error que se produzca
          console.log('Error en el Login:', error);
        }
      );
    }
    else
    alert("Por favor, ingrese el usuario y la contraseña.")

  }

  goToPasswordRecovery(){
    this.router.navigate(['/password-recovery']);
  }

  goToRegistration() {
    this.data.getUsers().subscribe((data) => {
      console.log(data);
    });
    this.router.navigate(['/register']);
  }
}