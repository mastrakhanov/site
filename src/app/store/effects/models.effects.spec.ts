import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestScheduler, hot } from 'jasmine-marbles';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { mockStoreInitialState } from 'src/testing/mock-store-initial-state';
import { modelStub } from 'src/testing/model-stub';
import { AlertService } from '@admin/shared/services/alert.service';
import { PostsService } from '@app/shared/posts.service';
import * as modelsActions from '@app/store/actions/models';

import { ModelsEffects } from '@app/store/effects/models.effects';


describe('ModelsEffects', () => {
  let modelsEffects: ModelsEffects;
  let postsService: PostsService;
  let alertService: AlertService;
  let actions: Observable<any>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ModelsEffects,
        AlertService,
        provideMockActions(() => actions),
        provideMockStore({ initialState: mockStoreInitialState }),
      ],
    }).compileComponents();

    modelsEffects = TestBed.inject(ModelsEffects);
    postsService = TestBed.inject(PostsService);
    alertService = TestBed.inject(AlertService);
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(modelsEffects).toBeTruthy();
  });

  it('load() should call loaded()', () => {
    spyOn(postsService, 'getAllModels').and.returnValue(of([modelStub]));
    actions = hot('-a-|', { a: modelsActions.load() });
    const expected = hot( '-a-|', { a: modelsActions.loaded({ models: [modelStub] }) });
    expect(modelsEffects.load$).toBeObservable(expected);
  });

  it('load() should call loadError()', () => {
    spyOn(postsService, 'getAllModels').and.returnValue(hot('-#|', {}, Error('Error')));
    actions = hot('-a-|', { a: modelsActions.load() });
    const expected = hot( '-a-|', { a: modelsActions.loadError() });
    expect(modelsEffects.load$).toBeObservable(expected);
  });

  it('create() should call load() and call alertService success()', () => {
    spyOn(postsService, 'createModel').and.returnValue(of(null));
    spyOn(alertService, 'success');

    actions = hot('-a-|', { a: modelsActions.create({ model: modelStub }) });
    const expected = hot( '-a-|', { a: modelsActions.load() });

    expect(modelsEffects.create$).toBeObservable(expected);
    expect(alertService.success).toHaveBeenCalledWith('Модель успешно создана');
  });

  it('create() should call createError()', () => {
    spyOn(postsService, 'createModel').and.returnValue(hot('-#|', {}, Error('Error')));
    actions = hot('-a-|', { a: modelsActions.create({ model: modelStub }) });
    const expected = hot( '-a-|', { a: modelsActions.createError({ error: Error('Error') }) });
    expect(modelsEffects.create$).toBeObservable(expected);
  });

  it('remove() should call remove() and call alertService success()', () => {
    spyOn(postsService, 'removeModel').and.returnValue(of(null));
    spyOn(alertService, 'success');

    actions = hot('-a-|', { a: modelsActions.remove({ id: '1' }) });
    const expected = hot( '-a-|', { a: modelsActions.remove({ id: '1' }) });

    expect(modelsEffects.remove$).toBeObservable(expected);
    expect(alertService.success).toHaveBeenCalledWith('Модель успешно удалена');
  });

  it('remove() should call removeError()', () => {
    spyOn(postsService, 'removeModel').and.returnValue(hot('-#|', {}, Error('Error')));
    actions = hot('-a-|', { a: modelsActions.remove({ id: '1' }) });
    const expected = hot( '-a-|', { a: modelsActions.removeError({ error: Error('Error') }) });
    expect(modelsEffects.remove$).toBeObservable(expected);
  });

  it('update() should call load() and call alertService success()', () => {
    spyOn(postsService, 'updateModel').and.returnValue(of(null));
    spyOn(alertService, 'success');

    actions = hot('-a-|', { a: modelsActions.update({ model: modelStub }) });
    const expected = hot( '-a-|', { a: modelsActions.load() });

    expect(modelsEffects.update$).toBeObservable(expected);
    expect(alertService.success).toHaveBeenCalledWith('Модель успешно изменена');
  });

  it('update() should call updateError()', () => {
    spyOn(postsService, 'updateModel').and.returnValue(hot('-#|', {}, Error('Error')));
    actions = hot('-a-|', { a: modelsActions.update({ model: modelStub }) });
    const expected = hot( '-a-|', { a: modelsActions.updateError({ error: Error('Error') }) });
    expect(modelsEffects.update$).toBeObservable(expected);
  });

  it('loadError() should call load()', () => {
    const scheduler = getTestScheduler();
    scheduler.run(helpers => {
      actions = helpers.hot('-a', { a: modelsActions.loadError() });
      helpers.expectObservable(modelsEffects.loadError$).toBe('- 10s a', { a: modelsActions.load() });
    });
  });
});
