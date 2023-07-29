import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountEditPageRoutingModule } from './account-edit-routing.module';

import { AccountEditPage } from './account-edit.page';

import { ImagePicker } from '@ionic-native/image-picker/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AccountEditPageRoutingModule
  ],
  declarations: [AccountEditPage],
  providers: [
    ImagePicker,
  ]
})
export class AccountEditPageModule {}
