import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  selectedTab: string;

  constructor(private barcodeScanner: BarcodeScanner) {
    this.selectedTab = 'home'; // Inicialización predeterminada
  }

  tabChanged(event: any) {
    this.selectedTab = event.tab;
  }

  async scan() {
    const result = await this.barcodeScanner.scan();
    if (!result.cancelled) {
      console.log('El Articulo es: ', result.text);
    }
  }

}
