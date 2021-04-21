import { Action } from '@ngrx/store';

export const AUTH_LOGIN = '[Auth] Login';
export const AUTH_LOGOUT = '[Auth] Logout';

export class LoginAction implements Action {
  readonly type = AUTH_LOGIN;
}

export class LogoutAction implements Action {
  readonly type = AUTH_LOGOUT;
}

export type AuthActions = LoginAction | LogoutAction;
