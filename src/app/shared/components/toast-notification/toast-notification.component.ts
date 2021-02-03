import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastTypeEnum } from './models/toast-type.enum';
import { ToastNotificationService } from './services/toast-notification.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss'],
  animations: [
    trigger('toastState', [
      state(
        '',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-150px)',
        }),
        animate(500),
      ]),
      transition('* => void', [
        animate(
          500,
          style({
            opacity: '0',
            transform: 'translateX(-150px)',
          })
        ),
      ]),
    ]),
  ],
})
export class ToastNotificationComponent implements OnInit, OnDestroy {
  public isVisible = false;
  public typeOfToast: ToastTypeEnum = ToastTypeEnum.Success;
  public typeOfToastEnum = ToastTypeEnum;
  public message: string;

  private setTimeOutVariable = 0;
  private unsubscriber$ = new Subject<void>();
  constructor(private toastNotificationService: ToastNotificationService) {}

  ngOnInit(): void {
    this.initializeSubscriptions();
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  private initializeSubscriptions(): void {
    this.toastNotificationService
      .listenToToastChanges()
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((toastInfo) => {
        if (this.setTimeOutVariable !== 0) {
          clearTimeout(this.setTimeOutVariable);
        }
        this.message = toastInfo.message;
        this.typeOfToast = toastInfo.toastType;
        this.isVisible = true;
        this.setTimeOutVariable = setTimeout(() => {
          this.isVisible = false;
          this.setTimeOutVariable = 0;
        }, toastInfo.duration);
      });
  }
}
