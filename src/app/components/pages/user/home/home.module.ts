import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventsModule } from '../../../common/events/events.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    MatCardModule,
    EventsModule,
    CommonModule,
    HomeRoutingModule,
    MatProgressSpinnerModule,
    NgbCarouselModule, 
    MatTooltipModule
  ]
})
export class HomeModule { }
