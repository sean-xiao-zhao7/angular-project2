import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Exercise } from '../models/exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UIService } from 'src/app/shared/ui.service';

@Injectable()
export class TrainingService {
  exerciseUpdated = new Subject<Exercise>();
  getExercisesEmitter = new Subject<Exercise[]>();
  myExercisesEmitter = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private currentExercise: Exercise;
  private subscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService) {}

  getExercises() {
    this.uiService.loadingStateChange.next(true);
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
            // throw new Error();
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.availableExercises = exercises;
            this.uiService.loadingStateChange.next(false);
            this.getExercisesEmitter.next(this.availableExercises.slice());
          },
          (error) => {
            this.uiService.showSnackbar(error.message, null, 3000);
            this.uiService.loadingStateChange.next(false);
            this.getExercisesEmitter.next(null);
          }
        )
    );
  }

  startExercise(exerciseId: string) {
    this.currentExercise = this.availableExercises.find(
      (e) => e.id === exerciseId
    );
    this.exerciseUpdated.next({ ...this.currentExercise });
  }

  finishExercise() {
    let newExercise = {
      ...this.currentExercise,
      date: new Date(),
      state: 'completed',
    } as Exercise;
    this.saveFirebase(newExercise);
    this.currentExercise = null;
    this.exerciseUpdated.next(null);
  }

  cancelExercise(progress: number) {
    let newExercise = {
      ...this.currentExercise,
      duration: this.currentExercise.duration * (progress / 100),
      calories: this.currentExercise.calories * (progress / 100),
      date: new Date(),
      state: 'canceled',
    } as Exercise;
    this.saveFirebase(newExercise);
    this.currentExercise = null;
    this.exerciseUpdated.next(null);
  }

  getCurrentExercise() {
    return { ...this.currentExercise };
  }

  getMyExercises() {
    this.subscriptions.push(
      this.db
        .collection('myExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.myExercisesEmitter.next(exercises);
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
