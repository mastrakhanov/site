import { commentStoreStub, mockStoreInitialState, modelStoreStub, newsStoreStub } from 'src/testing/mock-store-initial-state';
import * as fromRoot from '@app/store/reducers';


describe('Store selectors', () => {
  it('should return all comments', () => {
    expect(fromRoot.selectCommentsAll(mockStoreInitialState)).toEqual([commentStoreStub]);
  });

  it('should return all models', () => {
    expect(fromRoot.selectModelsAll(mockStoreInitialState)).toEqual([modelStoreStub]);
  });

  it('should return all news', () => {
    expect(fromRoot.selectNewsAll(mockStoreInitialState)).toEqual([newsStoreStub]);
  });

  it('should return loadingModels', () => {
    expect(fromRoot.selectLoadingModels(mockStoreInitialState)).toBeFalse();
  });

  it('should return loadingNews', () => {
    expect(fromRoot.selectLoadingNews(mockStoreInitialState)).toBeFalse();
  });
});
