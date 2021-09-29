import { createReducer, on } from '@ngrx/store';

import { IPost } from '@app/shared/interface';

import * as newsActions from '@app/store/actions/news';


export interface State {
  news: IPost[];
  loading: boolean;
}

export const initialState: State = {
  news: [],
  loading: false
};

export const reducer = createReducer(initialState,
  on(newsActions.load, state => ({ ...state, loading: true })),
  on(newsActions.loaded, (state, { news }) => ({ ...state, news, loading: false })),
  on(newsActions.remove, (state, { id }) => ({ ...state, news: state.news.filter(item => item.id !== id) }))
);

export const selectNews = ({ news }: State) => news;
export const selectLoading = ({ loading }: State) => loading;
