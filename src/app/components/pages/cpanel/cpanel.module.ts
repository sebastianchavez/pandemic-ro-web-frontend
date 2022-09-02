import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CpanelRoutingModule } from './cpanel-routing.module';
import { CpanelComponent, DialogContentAccount } from './cpanel.component';
import { HeaderModule } from '../../common/header/header.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    CpanelComponent,
    DialogContentAccount
  ],
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    CpanelRoutingModule
  ]
})
export class CpanelModule { }
