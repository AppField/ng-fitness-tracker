import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
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

  onClose(): void {
    this.closeSidenav.emit();
  }

  onLogout(): void {
    this.authService.logout();
    this.onClose();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
