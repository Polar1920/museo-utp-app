import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage {
  email: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
