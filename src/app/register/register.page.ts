import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: string = '';
  lastName: string = '';
  password: string = '';
  passwordRepet: string = '';
  showPassword: boolean = false;
  showPassword2: boolean = false;
  selectedFacultad: string = '';
  selectedCarrera: string = '';
  highlightLabelFlag: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibility2() {
    this.showPassword2 = !this.showPassword2;
  }

  submitRegister() {
    console.log('Datos del registro: Nombre:', this.name, this.lastName, this.selectedFacultad, this.selectedCarrera, this.password, this.passwordRepet);

    this.name = '';
    this.lastName = '';
    this.selectedFacultad = '';
    this.selectedCarrera = '';
    this.password = '';
    this.passwordRepet = '';

    this.router.navigate(['/login']);
    // Aquí puedes realizar cualquier otra lógica necesaria para el registro
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
