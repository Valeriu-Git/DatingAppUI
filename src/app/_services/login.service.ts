import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserInterface } from '../_models/user.interface';
import { LoginResponseInterface } from '../_models/login/login-response.interface';
import { LoginCredentialsInterface } from '../_models/login/login-credentials.interface';
import { baseURL } from '../shared/variables/base-url';
import { Store } from '@ngrx/store';
import { removeCurrentUser, updateCurrentUser } from '../shared/state/actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private store: Store,
    private route: Router
  ) {}

  public login(credentials: LoginCredentialsInterface): void {
    this.http
      .post<LoginResponseInterface>(`${baseURL}Account/login`, credentials)
      .subscribe((data) => {
        const currentUser: UserInterface = {
          userName: data.userName,
        };
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(currentUser));
        this.store.dispatch(updateCurrentUser(currentUser));
      });
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.store.dispatch(removeCurrentUser());
    this.route.navigate(['/home']);
  }

  public load(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (localStorage.getItem('user')) {
        const currentUser: UserInterface = JSON.parse(
          localStorage.getItem('user')
        );
        this.store.dispatch(updateCurrentUser(currentUser));
      }
      resolve(true);
    });
  }
}
