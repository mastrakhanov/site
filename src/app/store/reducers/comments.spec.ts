import { commentStub } from 'src/testing/comments-stub';
import { initialState, reducer } from '@app/store/reducers/comments';
import * as commentsActions from '@app/store/actions/comments';


describe('CommentsReducer', () => {
  it('loaded() should set comments', () => {
    const action = commentsActions.loaded({ comments: [commentStub] });
    const result = reducer(initialState, action);

    expect(result.comments).toEqual([commentStub]);
  });

  it('should return the previous state', () => {
    const action = {} as any;
    const result = reducer(initialState, action);

    expect(result).toBe(initialState);
  });
});
