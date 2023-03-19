import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CpanelRoutingModule } from './cpanel-routing.module';
import { CpanelComponent } from './cpanel.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { PrizesComponent } from './prizes/prizes.component';
import { RankComponent } from './rank/rank.component';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    CpanelComponent,
  ],
  imports: [
    CommonModule,
    CpanelRoutingModule,
  ]
})
export class CpanelModule { }
