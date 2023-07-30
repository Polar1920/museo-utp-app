import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ArticuloPageRoutingModule } from './articulo-routing.module';
import { ArticuloPage } from './articulo.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticuloPageRoutingModule
  ],
  declarations: [ArticuloPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArticuloPageModule {}
