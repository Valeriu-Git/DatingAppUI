import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/variables/base-url';
import { RegisterUserInterface } from '../_models/register/register-user.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  public registerUser(credentials: RegisterUserInterface): Observable<void> {
    return this.http.post<void>(`${baseURL}Account/register`, credentials);
  }
}
