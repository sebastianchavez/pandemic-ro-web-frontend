import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoginGuard } from './guards/is-login/is-login.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./components/pages/common/home/home.module').then(m => m.HomeModule)
  // },
  // {
  //   path: 'informacion',
  //   loadChildren: () => import('./components/pages/common/information/information.module').then(m => m.InformationModule)
  // },
  // {
  //   path: 'descargas',
  //   loadChildren: () => import('./components/pages/user/downloads/downloads.module').then(m => m.DownloadsModule)
  // },
  // {
  //   path: 'cpanel',
  //   loadChildren: () => import('./components/pages/cpanel/cpanel.module').then(m => m.CpanelModule),
  //   canActivate: [IsLoginGuard]
  // },
  // {
  //   path: 'foro',
  //   loadChildren: () => import('./components/pages/auth/foro/foro.module').then(m => m.ForoModule)
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./components/pages/common/login/login.module').then(m => m.LoginModule)
  // },
  // {
  //   path: 'registro',
  //   loadChildren: () => import('./components/pages/common/register/register.module').then(m => m.RegisterModule)
  // },
  // {
  //   path: 'perfil',
  //   loadChildren: () => import('./components/pages/auth/profile/profile.module').then(m => m.ProfileModule),
  //   canActivate: [IsLoginGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
