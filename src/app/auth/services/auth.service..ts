import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UIService } from 'src/app/shared/ui.service';
import { TrainingService } from 'src/app/training/services/training.service';
import { AuthData } from '../models/auth-data.model';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../reducers/ui.actions';
import * as AuthActions from '../../reducers/auth.actions';

@Injectable()
export class AuthService {
  private firebaseLoggedIn = false;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(new AuthActions.LoginAction());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.unsubscribe();
        this.store.dispatch(new AuthActions.LogoutAction());
        this.router.navigate(['/']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());
        console.log(error);
        this.uiService.showSnackbar(error.message, null, {
          duration: 3000,
        });
      });
  }

  loginUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());
        console.log(error);
        this.uiService.showSnackbar(error.message, null, {
          duration: 3000,
        });
      });
  }

  logoutUser() {
    this.auth.signOut();
  }

  getUser() {}

  isLoggedIn() {
    return this.firebaseLoggedIn;
  }
}
