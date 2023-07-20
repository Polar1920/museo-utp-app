import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  selectedTab: string;

  constructor() {
    this.selectedTab = 'home'; // Inicialización predeterminada
  }

  tabChanged(event: any) {
    this.selectedTab = event.tab;
  }

}
