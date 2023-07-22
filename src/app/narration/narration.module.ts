import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NarrationPageRoutingModule } from './narration-routing.module';

import { NarrationPage } from './narration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NarrationPageRoutingModule
  ],
  declarations: [NarrationPage]
})
export class NarrationPageModule {}
