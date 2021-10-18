import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { QuillModule } from 'ngx-quill';

import { commentStoreStub, mockStoreInitialState, newsStoreStub } from 'src/testing/mock-store-initial-state';
import { MockCommentsService } from 'src/testing/mock-comments.service';
import { MockPostsService } from 'src/testing/mock-posts.service';
import { AuthService } from '@admin/shared/services/auth.service';
import { CommentsService } from '@app/shared/comments.service';
import { PostsService } from '@app/shared/posts.service';
import { FooterComponent } from '@app/footer/footer.component';
import * as commentsActions from '@app/store/actions/comments';
import * as newsActions from '@app/store/actions/news';

import { NewsPageComponent } from './news-page.component';


describe('NewsPageComponent', () => {
  let component: NewsPageComponent;
  let fixture: ComponentFixture<NewsPageComponent>;
  let commentsService: CommentsService;
  let postsService: PostsService;
  let authService: AuthService;
  let store: Store;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsPageComponent, FooterComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        QuillModule
      ],
      providers: [
        provideMockStore({ initialState: mockStoreInitialState }),
        { provide: CommentsService, useClass: MockCommentsService },
        { provide: PostsService, useClass: MockPostsService },
        AuthService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPageComponent);
    component = fixture.componentInstance;
    commentsService = TestBed.inject(CommentsService);
    postsService = TestBed.inject(PostsService);
    authService = TestBed.inject(AuthService);
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain tags', () => {
    element = fixture.nativeElement;
    expect(element.innerHTML).toContain('quill-view-html');
    expect(element.innerHTML).toContain('app-footer');
  });

  it('should contain "title"', () => {
    element = fixture.nativeElement.querySelector('.news-content h2');
    expect(element.textContent).toContain(newsStoreStub.title);
  });

  it('should contain "text"', () => {
    element = fixture.nativeElement.querySelector('.comments-list__item p');
    expect(element.textContent).toContain(commentStoreStub.text);
  });

  it('should contain "Комментарии"', () => {
    element = fixture.nativeElement.querySelector('.comments-content h2');
    expect(element.textContent).toContain('Комментарии');
  });

  it('should contain "Дата"', () => {
    element = fixture.nativeElement.querySelector('.news-content small');
    expect(element.textContent).toContain('Дата');
  });

  it('should contain "Добавить"', () => {
    element = fixture.nativeElement.querySelector('.comments-content button');
    expect(element.textContent).toContain('Добавить');
  });

  it('formComment should be truthy', () => {
    expect(component.formComment).toBeTruthy();
  });

  it('should download postsN', () => {
    component.ngOnInit();
    component.postsN$.subscribe(post => expect(post).toEqual([newsStoreStub]));
  });

  it('should download commentList', () => {
    component.ngOnInit();
    component.commentsList$.subscribe(post => expect(post).toEqual([commentStoreStub]));
  });

  it('should loading to be false', () => {
    component.ngOnInit();
    component.loading$.subscribe(post => expect(post).toBeFalse());
  });

  it('should call store dispatch()', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(newsActions.load());
    expect(store.dispatch).toHaveBeenCalledWith(commentsActions.load());
  });

  it('should isAuthenticated to be true', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    component.ngOnInit();
    expect(component.isAuthenticated).toBeTruthy();
  });

  it('should submitComment() call store dispatch() and reset comment form', () => {
    spyOn(store, 'dispatch');
    component.formComment.setValue('text');
    component.submitComment();

    expect(component.formComment.value).toEqual(null);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('deleteComment() should call store dispatch()', () => {
    spyOn(store, 'dispatch');
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    component.deleteComment('1');
    expect(store.dispatch).toHaveBeenCalledWith(commentsActions.remove({ id: '1' }));
  });
});
