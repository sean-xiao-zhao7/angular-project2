import { Subject } from 'rxjs';
import { Exercise } from '../models/exercise.model';

export class TrainingService {
  exerciseUpdated = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];
  private currentExercise: Exercise;
  private myExercises: Exercise[] = [];

  getExercises() {
    return this.availableExercises.slice();
  }

  startExercise(exerciseId: string) {
    this.currentExercise = this.availableExercises.find(
      (e) => e.id === exerciseId
    );
    this.exerciseUpdated.next({ ...this.currentExercise });
  }

  finishExercise() {
    this.myExercises.push({
      ...this.currentExercise,
      date: new Date(),
      state: 'completed',
    });
    this.currentExercise = null;
    this.exerciseUpdated.next(null);
  }

  cancelExercise(progress: number) {
    this.myExercises.push({
      ...this.currentExercise,
      duration: this.currentExercise.duration * (progress / 100),
      calories: this.currentExercise.calories * (progress / 100),
      date: new Date(),
      state: 'canceled',
    });
    this.currentExercise = null;
    this.exerciseUpdated.next(null);
  }

  getCurrentExercise() {
    return { ...this.currentExercise };
  }

  getMyExercises() {
    return this.myExercises.slice();
  }
}
