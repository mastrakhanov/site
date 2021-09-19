import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { MockPostsService } from 'src/testing/mock-posts.service';
import { IPost } from '@app/shared/interface';
import { PostsService } from '@app/shared/posts.service';

import { FooterComponent } from '@app/footer/footer.component';
import { ModelsPageComponent } from './models-page.component';


describe('ModelsPageComponent', () => {
  let component: ModelsPageComponent;
  let fixture: ComponentFixture<ModelsPageComponent>;
  let postsService: PostsService;
  let element: HTMLElement;

  const postStub: IPost = { id: '1', title: 'title', text: 'text', date: new Date(0) };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ModelsPageComponent, FooterComponent],
      imports: [
        ReactiveFormsModule,
        QuillModule
      ],
      providers: [
        { provide: PostsService, useClass: MockPostsService },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsPageComponent);
    component = fixture.componentInstance;
    postsService = TestBed.inject(PostsService);
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
    element = fixture.nativeElement.querySelector('.models h2');
    expect(element.textContent).toContain('title');
  });

  it('should download postsM', () => {
    component.ngOnInit();
    component.postsM$.subscribe(post => expect(post).toEqual([postStub]));
  });
});
