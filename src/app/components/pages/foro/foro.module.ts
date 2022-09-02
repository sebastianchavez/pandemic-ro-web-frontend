import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForoRoutingModule } from './foro-routing.module';
import { ForoComponent } from './foro.component';
import { HeaderModule } from '../../common/header/header.module';


@NgModule({
  declarations: [
    ForoComponent
  ],
  imports: [
    HeaderModule,
    CommonModule,
    ForoRoutingModule
  ]
})
export class ForoModule { }
