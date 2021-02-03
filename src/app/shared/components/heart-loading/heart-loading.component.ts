import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { checkIfShowingLoadingAnimation } from '../../state/reducers';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  animate,
  animation,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { hideLoading } from '../../state/actions';

@Component({
  selector: 'app-heart-loading',
  templateUrl: './heart-loading.component.html',
  styleUrls: ['./heart-loading.component.scss'],
  animations: [
    trigger('loadingTrigger', [
      state(
        '',
        style({
          opacity: 1,
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(200),
      ]),
      transition('* => void', [
        animate(
          200,
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class HeartLoadingComponent implements OnInit, OnDestroy {
  public isVisible = true;
  public index = 0;

  private unsubscriber$ = new Subject<void>();
  private counter = 0;
  private setIntervalId: number;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.setIntervalId = setInterval(() => {
      this.counter++;
      this.index = this.counter % 3;
    }, 700);
    this.initializeStoreListener();
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
    if (this.setIntervalId) {
      clearInterval(this.setIntervalId);
    }
  }

  private initializeStoreListener(): void {
    this.store
      .pipe(
        select(checkIfShowingLoadingAnimation),
        takeUntil(this.unsubscriber$)
      )
      .subscribe((isVisible) => {
        this.isVisible = isVisible;
      });
  }
}
