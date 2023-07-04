import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  submitLogin() {
    // Aquí puedes procesar la información o enviar una solicitud al servidor
    console.log('Datos del login:', this.email, this.password);

    // Redirigir a otra página
    this.router.navigate(['/tabs/tab1']);
  }

  goToPasswordRecovery(){
    this.router.navigate(['/password-recovery']);
  }

  goToRegistration() {
    this.router.navigate(['/register']);
  }
}
