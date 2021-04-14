import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service.';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  authServiceSubscription: Subscription;
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authServiceSubscription = this.authService.isLoggedInStatus.subscribe(
      (currentStatus) => {
        this.isLoggedIn = currentStatus;
      }
    );
    this.authServiceSubscription;
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logoutUser();
  }

  ngOnDestroy() {
    this.authServiceSubscription.unsubscribe();
  }
}
