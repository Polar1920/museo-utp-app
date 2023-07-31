import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Quagga from 'quagga';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage {

  scanner: any;
  ID: string = '';

  constructor(private router: Router) {}

  ionViewDidEnter() {
    this.startScanning();
  }

  ionViewWillLeave() {
    this.stopScanning();
  }

  success(result: string) {
    this.ID = result;
    //this.goToArticle();
    this.stopScanning();
  }

  error(error: string) {
    console.error(error);
  }

  startScanning() {
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#scanner')    // Selector del elemento donde se muestra el escáner
      },
      decoder: {
        readers: ["code_128_reader","ean_reader","ean_8_reader","code_39_reader","code_39_vin_reader","codabar_reader","upc_reader","upc_e_reader","i2of5_reader"]
      }
    }, function(err: any) {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
    });
    
    Quagga.onDetected((result: any) => {
      this.success(result.codeResult.code);
    });
  }

  stopScanning() {
    Quagga.offDetected(this.success);
    Quagga.stop();
  }

  goToArticle() {

    localStorage.setItem('articulo_id', this.ID.toString());

    localStorage.setItem('showby', 'qr');

    this.router.navigate(['/articulo']);
  }
}