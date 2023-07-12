import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1-home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2-search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3-qr/qr.module').then(m => m.QRPageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../tab4-timeline/timeline.module').then(m => m.TimelinePageModule)
      },
      {
        path: 'tab5',
        loadChildren: () => import('../tab5-account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
