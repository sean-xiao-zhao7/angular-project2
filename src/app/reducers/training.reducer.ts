import {
  TrainingActions,
  SET_EXERCISES,
  SET_MY_EXERCISES,
  SET_CURRENT_EXERCISE,
  STOP_CURRENT_EXERCISE,
} from './training.actions';
import { Exercise } from '../training/models/exercise.model';
import * as fromRoot from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
  exercises: Exercise[];
  myExercises: Exercise[];
  currentExercise: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  exercises: [],
  myExercises: [],
  currentExercise: null,
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_EXERCISES:
      return {
        ...state,
        exercises: action.payload,
      };
    case SET_MY_EXERCISES:
      return {
        ...state,
        myExercises: action.payload,
      };
    case SET_CURRENT_EXERCISE:
      return {
        ...state,
        currentExercise: state.exercises.find(
          (exercise) => exercise.id === action.payload
        ),
      };
    case STOP_CURRENT_EXERCISE:
      return {
        ...state,
        currentExercise: null,
      };
    default:
      return state;
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>(
  'training'
);

export const getExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => {
    return state.exercises;
  }
);

export const getMyExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => {
    return state.myExercises;
  }
);

export const getCurrentExercise = createSelector(
  getTrainingState,
  (state: TrainingState) => {
    return state.currentExercise;
  }
);

export const getOnGoingTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => {
    return state.currentExercise != null;
  }
);
