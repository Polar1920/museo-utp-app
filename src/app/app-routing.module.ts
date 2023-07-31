import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs-navigation/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./tabs-navigation/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'timeline',
    loadChildren: () => import('./tabs-navigation/timeline/timeline.module').then( m => m.TimelinePageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./tabs-navigation/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'password-recovery',
    loadChildren: () => import('./password-recovery/password-recovery.module').then( m => m.PasswordRecoveryPageModule)
  },
  {
    path: 'articulo',
    loadChildren: () => import('./articulo/articulo.module').then( m => m.ArticuloPageModule)
  },
  {
    path: 'information',
    loadChildren: () => import('./information/information.module').then( m => m.InformationPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'proyecto',
    loadChildren: () => import('./proyecto/proyecto.module').then( m => m.ProyectoPageModule)
  },
  {
    path: 'integrantes',
    loadChildren: () => import('./integrantes/integrantes.module').then( m => m.IntegrantesPageModule)
  },
  {
    path: 'narration',
    loadChildren: () => import('./narration/narration.module').then( m => m.NarrationPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'account-edit',
    loadChildren: () => import('./account-edit/account-edit.module').then( m => m.AccountEditPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
