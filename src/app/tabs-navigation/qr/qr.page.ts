import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Html5QrcodeScanner } from 'html5-qrcode';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage {

  scanner: any;
  ID: string = '';

  constructor(private router: Router) { }

  ionViewDidEnter() {
    this.scanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: 250 }, /* verbose= */ false);

    this.startScanning();
  }

  ionViewWillLeave() {
    this.scanner.clear();
    this.scanner.stop();
  }

  success(result: string) {
    this.ID = result;
    this.goToArticle();
    this.scanner.clear();
    this.scanner.stop();
    const reader = document.getElementById('reader');
    if (reader) {
      reader.remove();
    }
  }

  error(error: string) {
    console.error(error);
  }

  startScanning() {
    this.scanner.render(this.success.bind(this), this.error.bind(this));
  }

  goToArticle() {

    localStorage.setItem('articulo_id', this.ID.toString());

    localStorage.setItem('showby', 'qr');

    this.router.navigate(['/articulo']);
  }
}