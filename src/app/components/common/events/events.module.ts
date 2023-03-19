import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    EventsComponent
  ],
  exports:[
    EventsComponent
  ],
  imports: [
    MatIconModule,
    CommonModule,
    MatTooltipModule
  ]
})
export class EventsModule { }
