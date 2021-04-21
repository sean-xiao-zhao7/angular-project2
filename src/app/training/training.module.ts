import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { PauseTrainingComponent } from './current-training/pause-training.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from '../reducers/training.reducer';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    PauseTrainingComponent,
  ],
  imports: [SharedModule, StoreModule.forFeature('training', trainingReducer)],
  exports: [],
  entryComponents: [PauseTrainingComponent],
})
export class TrainingModule {}
