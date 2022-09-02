import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { HeaderModule } from '../../common/header/header.module';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    HeaderModule,
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
