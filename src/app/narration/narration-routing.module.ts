import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NarrationPage } from './narration.page';

const routes: Routes = [
  {
    path: '',
    component: NarrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NarrationPageRoutingModule {}
