import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadsRoutingModule } from './downloads-routing.module';
import { DownloadsComponent } from './downloads.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    DownloadsComponent
  ],
  imports: [
    CommonModule,
    DownloadsRoutingModule,
    MatTooltipModule
  ]
})
export class DownloadsModule { }
