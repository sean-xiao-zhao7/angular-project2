import { UIActions, UI_START_LOADING, UI_STOP_LOADING } from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

export function uiReducer(state = initialState, action: UIActions) {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        isLoading: true,
      };
    case UI_STOP_LOADING:
      return {
        isLoading: false,
      };
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
