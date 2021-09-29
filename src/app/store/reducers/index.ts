import { InjectionToken } from '@angular/core';
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromComments from './comments';
import * as fromModels from './models';
import * as fromNews from './news';


export interface State {
  comments: fromComments.State;
  models: fromModels.State;
  news: fromNews.State;
}

export const reducers: ActionReducerMap<State> = {
  comments: fromComments.reducer,
  models: fromModels.reducer,
  news: fromNews.reducer
};

export const APP_ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State>>('Root Reducers', { factory: () => reducers });

const selectCommentsState = createFeatureSelector<State, fromComments.State>('comments');
export const selectCommentsAll = createSelector(
  selectCommentsState,
  fromComments.selectComments
);


const selectModelsState = createFeatureSelector<State, fromModels.State>('models');
export const selectModelsAll = createSelector(
  selectModelsState,
  fromModels.selectModels
);
export const selectLoadingModels = createSelector(
  selectModelsState,
  fromModels.selectLoading
);


const selectNewsState = createFeatureSelector<State, fromNews.State>('news');
export const selectNewsAll = createSelector(
  selectNewsState,
  fromNews.selectNews
);
export const selectLoadingNews = createSelector(
  selectNewsState,
  fromNews.selectLoading
);
