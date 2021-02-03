import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as SharedReducer from './state/reducers';
import { sharedStateKey } from './state/reducers';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HeartLoadingComponent } from './components/heart-loading/heart-loading.component';
import { ToastNotificationComponent } from './components/toast-notification/toast-notification.component';
import { MatMenuModule } from '@angular/material/menu';
import { GenericDropdownComponent } from './components/generic-dropdown/generic-dropdown.component';
import { ClickOutsideDirective } from './_directives/click-outside.directive';

@NgModule({
  declarations: [
    HeartLoadingComponent,
    ToastNotificationComponent,
    GenericDropdownComponent,
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(sharedStateKey, SharedReducer.reducer),
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    HeartLoadingComponent,
    ToastNotificationComponent,
    MatMenuModule,
    GenericDropdownComponent,
    ClickOutsideDirective,
  ],
})
export class SharedModule {}
