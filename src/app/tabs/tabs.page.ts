import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  selectedTab: string;
  ID: String = '';
  articulo: String = '';

  constructor(private router: Router, private platform: Platform, private barcodeScanner: BarcodeScanner) {
    this.selectedTab = 'home'; // Inicialización predeterminada
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler: () => void) => {
      console.log('Back button pressed');
      alert('Back button pressed');
      processNextHandler();
    });
  }

  async scan() {
    const result = await this.barcodeScanner.scan();
    if (!result.cancelled) {
      this.ID = result.text;

      let art: any;

      localStorage.setItem('articulo_id', this.ID.toString());

      localStorage.setItem('showby', 'qr');

      this.router.navigate(['/articulo']);
    }
  }

  tabChanged(event: any) {
    this.selectedTab = event.tab;
  }
}
