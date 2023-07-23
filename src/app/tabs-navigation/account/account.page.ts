import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../../data/data';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  usuario: any; // Definir la propiedad "usuario"

  constructor(private router: Router, private data: Data) { }

  ngOnInit() {
    // Obtener el objeto de usuario del localStorage
    let usuarioString = localStorage.getItem('usuario');

    if (usuarioString !== null) {
      this.usuario = JSON.parse(usuarioString);
    }
  }

  goToEditAccount() {
    this.router.navigate(['/account-edit']);
  }

  cerrarSesion() {
    this.data.Logout();
    this.router.navigate(['/login']);
  }

}
