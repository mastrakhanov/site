import { modelStub } from 'src/testing/model-stub';
import { initialState, reducer } from '@app/store/reducers/models';
import * as modelsActions from '@app/store/actions/models';


describe('ModelsReducer', () => {
  it('load() should set loading', () => {
    const action = modelsActions.load();
    const result = reducer(initialState, action);

    expect(result).toEqual({ models: [], loading: true } );
  });

  it('loaded() should set models and loading', () => {
    const action = modelsActions.loaded({ models: [modelStub] });
    const result = reducer(initialState, action);

    expect(result).toEqual({ models: [modelStub], loading: false });
  });

  it('remove() should remove model', () => {
    const loadedAction = modelsActions.loaded({ models: [modelStub] });
    reducer(initialState, loadedAction);

    const removeAction = modelsActions.remove({ id: '1' });
    const result = reducer(initialState, removeAction);

    expect(result).toEqual({ models: [], loading: false });
  });

  it('should return the previous state', () => {
    const action = {} as any;
    const result = reducer(initialState, action);

    expect(result).toBe(initialState);
  });
});
