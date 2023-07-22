import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimelinePageRoutingModule } from './timeline-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TimelinePage } from './timeline.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimelinePageRoutingModule
  ],
  declarations: [TimelinePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TimelinePageModule {}
