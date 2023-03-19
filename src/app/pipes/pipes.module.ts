import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrizesPipe } from './prizes/prizes.pipe';
import { JobPipe } from './job/job.pipe';



@NgModule({
  declarations: [
    PrizesPipe,
    JobPipe,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PrizesPipe, 
    JobPipe
  ]
})
export class PipesModule { }
