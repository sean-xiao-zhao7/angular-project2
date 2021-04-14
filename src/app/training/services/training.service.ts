import { Exercise } from '../models/exercise.model';

export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];
  private currentExercise: Exercise;

  getExercises() {
    return this.availableExercises.slice();
  }

  startExercise(exerciseId: string) {
    this.currentExercise = this.availableExercises.find(
      (e) => e.id === exerciseId
    );
  }

  getCurrentExercise() {
    return this.currentExercise;
  }
}
