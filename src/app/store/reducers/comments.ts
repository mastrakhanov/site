import { createReducer, on } from '@ngrx/store';

import { IComment } from '@app/shared/interface';

import * as commentsActions from '@app/store/actions/comments';


export interface State {
  comments: IComment[];
}

export const initialState: State = {
  comments: []
};

export const reducer = createReducer(initialState,
  on(commentsActions.loaded, (state, { comments }) => ({ ...state, comments })),
  on(commentsActions.remove, (state, { id }) => ({ ...state, comments: state.comments.filter(item => item.id !== id) }))
);

export const selectComments = ({ comments }: State) => comments;
