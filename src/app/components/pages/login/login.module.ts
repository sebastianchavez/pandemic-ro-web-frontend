import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { DialogContentRecovery, LoginComponent } from './login.component';
import { MatInputModule } from '@angular/material/input';
import { HeaderModule } from '../../common/header/header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    LoginComponent,
    DialogContentRecovery
  ],
  imports: [
    MatDialogModule,
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
