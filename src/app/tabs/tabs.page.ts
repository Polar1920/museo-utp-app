import { Component } from '@angular/core';
import { Data } from '../data/data';
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

  constructor(private router: Router, private data: Data, private platform: Platform) {
    this.selectedTab = 'home'; // Inicialización predeterminada
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler: () => void) => {
      console.log('Back button pressed');
      alert('Back button pressed');
      processNextHandler();
    });
  }

  gotToQR() {
    this.router.navigate(['/tabs/qr']);
  }

  tabChanged(event: any) {
    this.selectedTab = event.tab;
  }
}
