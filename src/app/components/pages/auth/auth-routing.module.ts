import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoginGuard } from 'src/app/guards/is-login/is-login.guard';

const routes: Routes = [
    {
      path: 'login',
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
      path: 'registro',
      loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
    },
    {
      path: 'cpanel',
      loadChildren: () => import('./cpanel/cpanel.module').then(m => m.CpanelModule),
      canActivate: [IsLoginGuard]
    },
    {
      path: 'perfil',
      loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      canActivate: [IsLoginGuard]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
