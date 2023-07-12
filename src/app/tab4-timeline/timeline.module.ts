import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimelinePage } from './timeline.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TimelinePageRoutingModule } from './timeline-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TimelinePageRoutingModule
  ],
  declarations: [TimelinePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TimelinePageModule {}
