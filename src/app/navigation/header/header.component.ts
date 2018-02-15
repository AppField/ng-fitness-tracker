import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  private destroy$ = new Subject<boolean>();
  isAuth = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {

    this.authService.authChange
      .takeUntil(this.destroy$)
      .subscribe((authStatus: boolean) => {
        this.isAuth = authStatus;
      });

  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
