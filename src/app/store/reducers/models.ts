import { createReducer, on } from '@ngrx/store';

import { IPost } from '@app/shared/interface';

import * as modelsActions from '@app/store/actions/models';


export interface State  {
  models: IPost[];
  loading: boolean;
}

export const initialState: State = {
  models: [],
  loading: false
};

export const reducer = createReducer(initialState,
  on(modelsActions.load, state => ({ ...state, loading: true })),
  on(modelsActions.loaded, (state, { models }) => ({ ...state, models, loading: false })),
  on(modelsActions.remove, (state, { id }) => ({ ...state, models: state.models.filter(item => item.id !== id) }))
);

export const selectModels = ({ models }: State) => models;
export const selectLoading = ({ loading }: State) => loading;
