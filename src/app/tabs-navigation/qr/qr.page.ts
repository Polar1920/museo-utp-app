import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScanResult } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  ID = '';

  constructor(private barcodeScanner: BarcodeScanner, private alertController: AlertController) { }

  ngOnInit() {
    this.scan();
  }

  async scan() {
    /*
    try {
      const barcodeData: BarcodeScanResult = await this.barcodeScanner.scan();
      console.log('Datos escaneados:', barcodeData.text);
      alert('Datos escaneados: ' + barcodeData.text);
      this.ID = barcodeData.text;
      localStorage.setItem('qr_id', this.ID.toString());
    } catch (error) {
      console.error('Error al escanear:', error);
    }*/

    /*
    const result = await this.barcodeScanner.scan();
    
    if (!result.cancelled) {
      this.ID = result.text;
      localStorage.setItem('qr_id', this.ID.toString());
      //this.presentAlert('El código QR escaneado es: '+ this.ID);
    }*/
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Código QR escaneado',
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

}