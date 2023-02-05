import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrizesPipe } from './prizes/prizes.pipe';



@NgModule({
  declarations: [
    PrizesPipe,
  ],
  imports: [
    CommonModule
  ],
  exports:[PrizesPipe]
})
export class PipesModule { }
