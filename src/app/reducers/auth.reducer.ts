import { AuthActions, AUTH_LOGIN, AUTH_LOGOUT } from './auth.actions';

export interface State {
  isLoggedIn: boolean;
}

const initialState: State = {
  isLoggedIn: false,
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        isLoggedIn: true,
      };
    case AUTH_LOGOUT:
      return {
        isLoggedIn: false,
      };
    default:
      return state;
  }
}

export const getIsLoggedIn = (state: State) => {
  return state.isLoggedIn;
};
