import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab0',
  templateUrl: './tab0.page.html',
  styleUrls: ['./tab0.page.scss'],
})
export class Tab0Page implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    setTimeout(()=>{
      this.navCtrl.navigateForward('/login');
    }, 5000);
  }
}
