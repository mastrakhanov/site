import { newsStub } from 'src/testing/news-stub';
import { initialState, reducer } from '@app/store/reducers/news';
import * as newsActions from '@app/store/actions/news';


describe('NewsReducer', () => {
  it('load() should set loading', () => {
    const action = newsActions.load();
    const result = reducer(initialState, action);

    expect(result).toEqual({ news: [], loading: true } );
  });

  it('loaded() should set news and loading', () => {
    const action = newsActions.loaded({ news: [newsStub] });
    const result = reducer(initialState, action);

    expect(result).toEqual({ news: [newsStub], loading: false });
  });

  it('remove() should remove news', () => {
    const loadedAction = newsActions.loaded({ news: [newsStub] });
    reducer(initialState, loadedAction);

    const removeAction = newsActions.remove({ id: '1' });
    const result = reducer(initialState, removeAction);

    expect(result).toEqual({ news: [], loading: false });
  });

  it('should return the previous state', () => {
    const action = {} as any;
    const result = reducer(initialState, action);

    expect(result).toBe(initialState);
  });
});
