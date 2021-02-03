import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToastInfoInterface } from '../models/toast-info.interface';
import { ToastTypeEnum } from '../models/toast-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
  private toastSubject = new Subject<ToastInfoInterface>();
  constructor() {}

  public listenToToastChanges(): Observable<ToastInfoInterface> {
    return this.toastSubject.asObservable();
  }

  public sendSuccessToast(message: string, duration = 5000): void {
    const toastInfo: ToastInfoInterface = {
      duration,
      message,
      toastType: ToastTypeEnum.Success,
    };
    this.toastSubject.next(toastInfo);
  }

  public sendErrorToast(message: string, duration = 5000): void {
    const toastInfo: ToastInfoInterface = {
      duration,
      message,
      toastType: ToastTypeEnum.Error,
    };
    this.toastSubject.next(toastInfo);
  }
}
