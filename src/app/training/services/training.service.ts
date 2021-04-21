import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Exercise } from '../models/exercise.model';
import { UIService } from 'src/app/shared/ui.service';

import * as fromTraining from '../../reducers/training.reducer';
import * as UI from '../../reducers/ui.actions';
import * as trainingActions from '../../reducers/training.actions';

@Injectable()
export class TrainingService {
  private subscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  getExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.subscriptions.push(
      this.db
        .collection<Exercise>('angular1')
        .snapshotChanges()
        .pipe(
          map((actions) => {
            return actions.map((item) => {
              const data = item.payload.doc.data();
              const id = item.payload.doc.id;
              return { id, ...data };
            });
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(
              new trainingActions.setExercisesAction(exercises)
            );
          },
          (error) => {
            this.uiService.showSnackbar(error.message, null, 3000);
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new trainingActions.setExercisesAction([]));
          }
        )
    );
  }

  startExercise(exerciseId: string) {
    this.store.dispatch(
      new trainingActions.setCurrentExerciseAction(exerciseId)
    );
  }

  finishExercise() {
    this.store
      .select(fromTraining.getCurrentExercise)
      .pipe(take(1))
      .subscribe((exercise) => {
        let newExercise = {
          ...exercise,
          date: new Date(),
          state: 'completed',
        } as Exercise;
        this.saveFirebase(newExercise);
        this.store.dispatch(new trainingActions.stopCurrentExerciseAction());
      });
  }

  cancelExercise(progress: number) {
    this.store
      .select(fromTraining.getCurrentExercise)
      .pipe(take(1))
      .subscribe((exercise) => {
        let newExercise = {
          ...exercise,
          duration: exercise.duration * (progress / 100),
          calories: exercise.calories * (progress / 100),
          date: new Date(),
          state: 'canceled',
        } as Exercise;
        this.saveFirebase(newExercise);
        this.store.dispatch(new trainingActions.stopCurrentExerciseAction());
      });
  }

  getMyExercises() {
    this.subscriptions.push(
      this.db
        .collection('myExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(
            new trainingActions.setMyExercisesAction(exercises)
          );
        })
    );
  }

  unsubscribe() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private saveFirebase(exercise: Exercise) {
    this.db.collection('myExercises').add(exercise);
  }
}
