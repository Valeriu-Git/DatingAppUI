import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserInterface } from './_models/user.interface';
import { LoginService } from './_services/login.service';
import { LoginCredentialsInterface } from './_models/login/login-credentials.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UsersService } from './_services/users.service';
import { select, Store } from '@ngrx/store';
import { getCurrentUser } from './shared/state/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public currentUser: UserInterface = null;
  private unsubscriber$ = new Subject<void>();
  constructor(
    private loginService: LoginService,
    private usersService: UsersService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select(getCurrentUser), takeUntil(this.unsubscriber$))
      .subscribe((user) => {
        this.currentUser = user;
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  public onLoginAttempt(credentials: LoginCredentialsInterface): void {
    this.loginService.login(credentials);
  }

  public onLogout(): void {
    this.loginService.logout();
  }
}
