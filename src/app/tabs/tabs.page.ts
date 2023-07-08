import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  selectedTab: string;

  constructor() {
    this.selectedTab = 'tab1'; // Inicialización predeterminada
  }

  tabChanged(event: any) {
    this.selectedTab = event.tab;
  }

}
