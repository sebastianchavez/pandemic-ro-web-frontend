import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpanelComponent } from './cpanel.component';

const routes: Routes = [
  {
    path: '',
    component: CpanelComponent,
    children: [
      {
        path: 'cuentas',
        loadChildren: () => import("./my-accounts/my-accounts.module").then(m => m.MyAccountsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CpanelRoutingModule { }
