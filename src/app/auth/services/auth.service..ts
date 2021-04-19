import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { TrainingService } from 'src/app/training/services/training.service';
import { AuthData } from '../models/auth-data.model';

@Injectable()
export class AuthService {
  public isLoggedInStatus = new Subject<boolean>();
  private firebaseLoggedIn = false;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.firebaseLoggedIn = true;
        this.isLoggedInStatus.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.unsubscribe();
        this.firebaseLoggedIn = false;
        this.isLoggedInStatus.next(false);
        this.router.navigate(['/']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChange.next(true);
    this.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.uiService.loadingStateChange.next(false);
      })
      .catch((error) => {
        this.uiService.loadingStateChange.next(false);
        console.log(error);
        this.uiService.showSnackbar(error.message, null, {
          duration: 3000,
        });
      });
  }

  loginUser(authData: AuthData) {
    this.uiService.loadingStateChange.next(true);
    this.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.uiService.loadingStateChange.next(false);
      })
      .catch((error) => {
        this.uiService.loadingStateChange.next(false);
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
