import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpanelComponent } from './cpanel.component';

const routes: Routes = [
  {
    path: '',
    component: CpanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CpanelRoutingModule { }
