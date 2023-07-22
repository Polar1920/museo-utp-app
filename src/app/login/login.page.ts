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
  showPassword: boolean = false;

  constructor(private router: Router) { }
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submitLogin() {
    console.log('Datos del login:', this.email, this.password);

    this.router.navigate(['/tabs/home']);
  }

  goToPasswordRecovery(){
    this.router.navigate(['/password-recovery']);
  }

  goToRegistration() {
    this.router.navigate(['/register']);
  }
}
