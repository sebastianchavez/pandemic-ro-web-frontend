import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatInputModule } from '@angular/material/input';
import { HeaderModule } from '../../common/header/header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    HeaderModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
