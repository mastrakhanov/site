import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { of } from 'rxjs';

import { MockCommentsService } from 'src/testing/mock-comments.service';
import { MockPostsService } from 'src/testing/mock-posts.service';
import { AuthService } from '@admin/shared/services/auth.service';
import { IComment, IPost } from '@app/shared/interface';
import { CommentsService } from '@app/shared/comments.service';
import { PostsService } from '@app/shared/posts.service';

import { FooterComponent } from '@app/footer/footer.component';
import { NewsPageComponent } from './news-page.component';


describe('NewsPageComponent', () => {
  let component: NewsPageComponent;
  let fixture: ComponentFixture<NewsPageComponent>;
  let commentsService: CommentsService;
  let postsService: PostsService;
  let authService: AuthService;
  let element: HTMLElement;

  const postStub: IPost = { id: '1', title: 'title', text: 'text', date: new Date(0) };
  const commentStub: IComment = { id: '1', text: 'text', date: new Date(0) };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [NewsPageComponent, FooterComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        QuillModule
      ],
      providers: [
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

  it('should download postsN', () => {
    component.ngOnInit();
    component.postsN$.subscribe(post => expect(post).toEqual([postStub]));
  });

  it('should download commentList', () => {
    component.ngOnInit();
    component.commentsList$.subscribe(post => expect(post).toEqual([commentStub]));
  });

  it('should isAuthenticated to be true', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    component.ngOnInit();
    expect(component.isAuthenticated).toBeTruthy();
  });

  it('should submitComment() create comment and reset comment form', () => {
    spyOn(commentsService, 'createComment').and.returnValue(of({} as IComment));
    component.formComment.setValue({ text: 'text' });
    component.submitComment();
    expect(component.formComment.value).toEqual({ text: null });
    expect(commentsService.createComment).toHaveBeenCalled();
  });

  it('should deleteComment() remove comment', () => {
    spyOn(commentsService, 'removeComment').and.returnValue(of());
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    component.deleteComment('1');
    expect(commentsService.removeComment).toHaveBeenCalledWith('1');
  });
});
