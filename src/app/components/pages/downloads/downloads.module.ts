import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadsRoutingModule } from './downloads-routing.module';
import { DownloadsComponent } from './downloads.component';
import { HeaderModule } from '../../common/header/header.module';


@NgModule({
  declarations: [
    DownloadsComponent
  ],
  imports: [
    HeaderModule,
    CommonModule,
    DownloadsRoutingModule
  ]
})
export class DownloadsModule { }
