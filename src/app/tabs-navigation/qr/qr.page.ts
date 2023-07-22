import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
    this.scan();
  }

  async scan() {
    const result = await this.barcodeScanner.scan();
    if (!result.cancelled) {
      console.log('El código QR escaneado es: ', result.text);
    }
  }

}
