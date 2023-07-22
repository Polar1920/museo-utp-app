import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToEditAccount() {
    this.router.navigate(['/account-edit']);
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
  }

}
