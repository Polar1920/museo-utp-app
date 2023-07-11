import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { QRPage } from './qr.page';

import { QRRoutingModule } from './qr-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRRoutingModule
  ],
  declarations: [QRPage]
})
export class QRPageModule {}
