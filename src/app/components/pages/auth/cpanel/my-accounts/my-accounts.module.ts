import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountsRoutingModule } from './my-accounts-routing.module';
import { DialogContentAccount, DialogContentPj, MyAccountsComponent } from './my-accounts.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    MyAccountsComponent,
    DialogContentAccount,
    DialogContentPj
  ],
  imports: [
    PipesModule,
    CommonModule,
    MyAccountsRoutingModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatTooltipModule,
    PipesModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
  ]
})
export class MyAccountsModule { }
