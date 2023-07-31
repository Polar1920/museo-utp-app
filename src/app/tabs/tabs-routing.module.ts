import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../tabs-navigation/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../tabs-navigation/search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'timeline',
        loadChildren: () => import('../tabs-navigation/timeline/timeline.module').then( m => m.TimelinePageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../tabs-navigation/account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
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
