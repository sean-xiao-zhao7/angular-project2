import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../models/exercise.model';
import { TrainingService } from '../services/training.service';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
@Injectable()
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  selectedExercise: Exercise;
  getExercisesSubscription: Subscription;
  isLoading: boolean = false;
  private uiSubscription: Subscription;

  constructor(private service: TrainingService, private uiService: UIService) {}

  ngOnInit(): void {
    this.getExercisesSubscription = this.service.getExercisesEmitter.subscribe(
      (exercises) => (this.exercises = exercises)
    );
    this.uiSubscription = this.uiService.loadingStateChange.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
    this.getExercises();
  }

  getExercises() {
    this.service.getExercises();
  }

  onStartTraining(form: NgForm) {
    this.service.startExercise(form.value.exerciseOption);
  }

  ngOnDestroy() {
    this.getExercisesSubscription.unsubscribe();
  }
}
