import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HeaderComponent } from '../../common/header/header.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MatIconModule,
    NgbCarouselModule, 
  ],
  declarations: [
    HeaderComponent,
    UserComponent
  ]
})
export class UserModule { }
