import { createAction, props } from '@ngrx/store';
import { UserInterface } from '../../_models/user.interface';

// get current user
export const updateCurrentUser = createAction(
  '[Shared] Update Current User',
  props<UserInterface>()
);

// remove current user after sign-out
export const removeCurrentUser = createAction('[Shared] Remove Current User');

export const showLoading = createAction('[Shared] Show Loading');

export const hideLoading = createAction('[Shared] Hide Loading');
