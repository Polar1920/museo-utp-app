import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Data } from '../data/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  selectedTab: string;
  ID: String = '';
  articulo: String = '';

  constructor(private router: Router, private barcodeScanner: BarcodeScanner, private data: Data) {
    this.selectedTab = 'home'; // Inicialización predeterminada
  }

  tabChanged(event: any) {
    this.selectedTab = event.tab;
  }

  async scan() {
    const result = await this.barcodeScanner.scan();
    if (!result.cancelled) {
      this.ID = result.text;

      let art: any;

      localStorage.setItem('articulo_id', this.ID.toString());

      /*

      this.data.getArticuloQR(this.ID.toString()).subscribe(
        (response) => {
          let jsonString = JSON.stringify(response);
          let resp = JSON.parse(jsonString);
          this.articulo = jsonString;
          this.data.presentAlert('Código QR escaneado', this.articulo.toString());
          art = this.data.convertirObjeto(response);
          localStorage.setItem('articulo', art);//JSON.stringify(this.articulo)
          //alert(this.articulo);
        },
        (error) => {
          alert('Error al obtener articulo: ' + error);
        }
      );*/
      //localStorage.setItem('qr_id', this.ID.toString());
      //alert('qr_id '+this.ID.toString());
    }
  }
}
