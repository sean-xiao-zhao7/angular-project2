import { Action } from '@ngrx/store';
import { Exercise } from '../training/models/exercise.model';

export const SET_EXERCISES = '[Training] Set exercises';
export const SET_MY_EXERCISES = '[Training] Set my exercises';
export const SET_CURRENT_EXERCISE = '[Training] Set current training';
export const STOP_CURRENT_EXERCISE = '[Training] Stop current training';

export class setExercisesAction implements Action {
  readonly type = SET_EXERCISES;

  constructor(public payload: Exercise[]) {}
}

export class setMyExercisesAction implements Action {
  readonly type = SET_MY_EXERCISES;

  constructor(public payload: Exercise[]) {}
}

export class setCurrentExerciseAction implements Action {
  readonly type = SET_CURRENT_EXERCISE;

  constructor(public payload: string) {}
}

export class stopCurrentExerciseAction implements Action {
  readonly type = STOP_CURRENT_EXERCISE;
}

export type TrainingActions =
  | setExercisesAction
  | setMyExercisesAction
  | setCurrentExerciseAction
  | stopCurrentExerciseAction;
