import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as SharedActions from './actions';
import { UserInterface } from '../../_models/user.interface';

export const sharedStateKey = 'shared';

export interface SharedState {
  currentUser: UserInterface;
  showLoadingAnimation: boolean;
}

export const initialSharedState: SharedState = {
  currentUser: null,
  showLoadingAnimation: false,
};

export const sharedReducer = createReducer(
  initialSharedState,
  on(SharedActions.updateCurrentUser, (state, { userName }) => {
    const newSharedState: SharedState = {
      ...state,
      currentUser: {
        userName,
      },
    };
    return newSharedState;
  }),
  on(SharedActions.removeCurrentUser, (state, {}) => {
    const newSharedState: SharedState = {
      ...state,
      currentUser: null,
    };
    return newSharedState;
  }),
  on(SharedActions.showLoading, (state) => {
    const newSharedState: SharedState = {
      ...state,
      showLoadingAnimation: true,
    };
    return newSharedState;
  }),
  on(SharedActions.hideLoading, (state) => {
    const newSharedState: SharedState = {
      ...state,
      showLoadingAnimation: false,
    };

    return newSharedState;
  })
);

export function reducer(state: SharedState | undefined, action: Action) {
  return sharedReducer(state, action);
}

// selectors
const userStateSelector = createFeatureSelector<SharedState>(sharedStateKey);

export const getCurrentUser = createSelector(
  userStateSelector,
  (state: SharedState) => {
    return state.currentUser;
  }
);

export const checkIfShowingLoadingAnimation = createSelector(
  userStateSelector,
  (state: SharedState) => {
    return state.showLoadingAnimation;
  }
);
