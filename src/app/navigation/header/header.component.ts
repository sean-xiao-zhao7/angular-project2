import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service.';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isLoggedIn$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
    private service: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(fromRoot.getIsLoggedIn);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.service.logoutUser();
  }
}
