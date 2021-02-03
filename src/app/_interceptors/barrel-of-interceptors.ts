import { APP_INITIALIZER, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './http-interceptor.service';
import { loginServiceFactory } from '../shared/variables/login-service-factory';
import { LoginService } from '../_services/login.service';

export const httpInterceptorProviders: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
  {
    provide: APP_INITIALIZER,
    useFactory: loginServiceFactory,
    deps: [LoginService],
    multi: true,
  },
];
