import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestScheduler, hot } from 'jasmine-marbles';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { mockStoreInitialState } from 'src/testing/mock-store-initial-state';
import { newsStub } from 'src/testing/news-stub';
import { AlertService } from '@admin/shared/services/alert.service';
import { PostsService } from '@app/shared/posts.service';
import * as newsActions from '@app/store/actions/news';

import { NewsEffects } from '@app/store/effects/news.effects';


describe('NewsEffects', () => {
  let newsEffects: NewsEffects;
  let postsService: PostsService;
  let alertService: AlertService;
  let actions: Observable<any>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NewsEffects,
        AlertService,
        provideMockActions(() => actions),
        provideMockStore({ initialState: mockStoreInitialState }),
      ],
    }).compileComponents();

    newsEffects = TestBed.inject(NewsEffects);
    postsService = TestBed.inject(PostsService);
    alertService = TestBed.inject(AlertService);
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(newsEffects).toBeTruthy();
  });

  it('load() should call loaded()', () => {
    spyOn(postsService, 'getAllNews').and.returnValue(of([newsStub]));
    actions = hot('-a-|', { a: newsActions.load() });
    const expected = hot( '-a-|', { a: newsActions.loaded({ news: [newsStub] }) });
    expect(newsEffects.load$).toBeObservable(expected);
  });

  it('load() should call loadError()', () => {
    spyOn(postsService, 'getAllNews').and.returnValue(hot('-#|', {}, Error('Error')));
    actions = hot('-a-|', { a: newsActions.load() });
    const expected = hot( '-a-|', { a: newsActions.loadError() });
    expect(newsEffects.load$).toBeObservable(expected);
  });

  it('create() should call load() and call alertService success()', () => {
    spyOn(postsService, 'createNews').and.returnValue(of(null));
    spyOn(alertService, 'success');

    actions = hot('-a-|', { a: newsActions.create({ news: newsStub }) });
    const expected = hot( '-a-|', { a: newsActions.load() });

    expect(newsEffects.create$).toBeObservable(expected);
    expect(alertService.success).toHaveBeenCalledWith('Новость успешно создана');
  });

  it('create() should call createError()', () => {
    spyOn(postsService, 'createNews').and.returnValue(hot('-#|', {}, Error('Error')));
    actions = hot('-a-|', { a: newsActions.create({ news: newsStub }) });
    const expected = hot( '-a-|', { a: newsActions.createError({ error: Error('Error') }) });
    expect(newsEffects.create$).toBeObservable(expected);
  });

  it('remove() should call remove() and call alertService success()', () => {
    spyOn(postsService, 'removeNews').and.returnValue(of(null));
    spyOn(alertService, 'success');

    actions = hot('-a-|', { a: newsActions.remove({ id: '1' }) });
    const expected = hot( '-a-|', { a: newsActions.remove({ id: '1' }) });

    expect(newsEffects.remove$).toBeObservable(expected);
    expect(alertService.success).toHaveBeenCalledWith('Новость успешно удалена');
  });

  it('remove() should call removeError()', () => {
    spyOn(postsService, 'removeNews').and.returnValue(hot('-#|', {}, Error('Error')));
    actions = hot('-a-|', { a: newsActions.remove({ id: '1' }) });
    const expected = hot( '-a-|', { a: newsActions.removeError({ error: Error('Error') }) });
    expect(newsEffects.remove$).toBeObservable(expected);
  });

  it('update() should call load() and call alertService success()', () => {
    spyOn(postsService, 'updateNews').and.returnValue(of(null));
    spyOn(alertService, 'success');

    actions = hot('-a-|', { a: newsActions.update({ news: newsStub }) });
    const expected = hot( '-a-|', { a: newsActions.load() });

    expect(newsEffects.update$).toBeObservable(expected);
    expect(alertService.success).toHaveBeenCalledWith('Новость успешно изменена');
  });

  it('update() should call updateError()', () => {
    spyOn(postsService, 'updateNews').and.returnValue(hot('-#|', {}, Error('Error')));
    actions = hot('-a-|', { a: newsActions.update({ news: newsStub }) });
    const expected = hot( '-a-|', { a: newsActions.updateError({ error: Error('Error') }) });
    expect(newsEffects.update$).toBeObservable(expected);
  });

  it('loadError() should call load()', () => {
    const scheduler = getTestScheduler();
    scheduler.run(helpers => {
      actions = helpers.hot('-a', { a: newsActions.loadError() });
      helpers.expectObservable(newsEffects.loadError$).toBe('- 10s a', { a: newsActions.load() });
    });
  });
});
