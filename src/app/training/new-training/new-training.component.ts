import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Exercise } from '../models/exercise.model';
import { TrainingService } from '../services/training.service';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../../reducers/training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
@Injectable()
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  selectedExercise: Exercise;
  isLoading$: Observable<boolean>;

  constructor(
    private service: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.service.getExercises();
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getExercises);
  }

  getExercises() {
    this.service.getExercises();
  }

  onStartTraining(form: NgForm) {
    this.service.startExercise(form.value.exerciseOption);
  }
}
