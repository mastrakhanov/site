import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestScheduler, hot } from 'jasmine-marbles';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { mockStoreInitialState } from 'src/testing/mock-store-initial-state';
import { commentStub } from 'src/testing/comments-stub';
import { CommentsService } from '@app/shared/comments.service';
import * as commentsActions from '@app/store/actions/comments';

import { CommentsEffects } from '@app/store/effects/comments.effects';


describe('CommentsEffects', () => {
  let commentsEffects: CommentsEffects;
  let commentsService: CommentsService;
  let actions: Observable<any>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CommentsEffects,
        provideMockActions(() => actions),
        provideMockStore({ initialState: mockStoreInitialState }),
      ],
    }).compileComponents();

    commentsEffects = TestBed.inject(CommentsEffects);
    commentsService = TestBed.inject(CommentsService);
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(commentsEffects).toBeTruthy();
  });

  it('load() should call loaded()', () => {
    spyOn(commentsService, 'getAllComments').and.returnValue(of([commentStub]));
    actions = hot('-a-|', { a: commentsActions.load() });
    const expected = hot( '-a-|', { a: commentsActions.loaded({ comments: [commentStub] }) });
    expect(commentsEffects.load$).toBeObservable(expected);
  });

  it('load() should call loadError()', () => {
    spyOn(commentsService, 'getAllComments').and.returnValue(hot('-#|', {}, Error('Error')));
    actions = hot('-a-|', { a: commentsActions.load() });
    const expected = hot( '-a-|', { a: commentsActions.loadError() });
    expect(commentsEffects.load$).toBeObservable(expected);
  });

  it('create() should call load()', () => {
    spyOn(commentsService, 'createComment').and.returnValue(of(null));
    actions = hot('-a-|', { a: commentsActions.create({ comment: commentStub }) });
    const expected = hot( '-a-|', { a: commentsActions.load() });
    expect(commentsEffects.create$).toBeObservable(expected);
  });

  it('create() should call createError()', () => {
    spyOn(commentsService, 'createComment').and.returnValue(hot('-#|', {}, Error('Error')));
    actions = hot('-a-|', { a: commentsActions.create({ comment: commentStub }) });
    const expected = hot( '-a-|', { a: commentsActions.createError({ error: Error('Error') }) });
    expect(commentsEffects.create$).toBeObservable(expected);
  });

  it('remove() should call remove()', () => {
    spyOn(commentsService, 'removeComment').and.returnValue(of(null));
    actions = hot('-a-|', { a: commentsActions.remove({ id: '1' }) });
    const expected = hot( '-a-|', { a: commentsActions.remove({ id: '1' }) });
    expect(commentsEffects.remove$).toBeObservable(expected);
  });

  it('remove() should call removeError()', () => {
    spyOn(commentsService, 'removeComment').and.returnValue(hot('-#|', {}, Error('Error')));
    actions = hot('-a-|', { a: commentsActions.remove({ id: '1' }) });
    const expected = hot( '-a-|', { a: commentsActions.removeError({ error: Error('Error') }) });
    expect(commentsEffects.remove$).toBeObservable(expected);
  });

  it('loadError() should call load()', () => {
    const scheduler = getTestScheduler();
    scheduler.run(helpers => {
      actions = helpers.hot('-a', { a: commentsActions.loadError() });
      helpers.expectObservable(commentsEffects.loadError$).toBe('- 10s a', { a: commentsActions.load() });
    });
  });
});
