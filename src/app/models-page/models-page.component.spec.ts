import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { QuillModule } from 'ngx-quill';

import { mockStoreInitialState, modelStoreStub } from 'src/testing/mock-store-initial-state';
import { MockPostsService } from 'src/testing/mock-posts.service';

import { PostsService } from '@app/shared/posts.service';
import { FooterComponent } from '@app/footer/footer.component';
import * as modelsActions from '@app/store/actions/models';

import { ModelsPageComponent } from './models-page.component';


describe('ModelsPageComponent', () => {
  let component: ModelsPageComponent;
  let fixture: ComponentFixture<ModelsPageComponent>;
  let postsService: PostsService;
  let store: Store;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelsPageComponent, FooterComponent],
      imports: [
        ReactiveFormsModule,
        QuillModule
      ],
      providers: [
        provideMockStore({ initialState: mockStoreInitialState }),
        { provide: PostsService, useClass: MockPostsService },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsPageComponent);
    component = fixture.componentInstance;
    postsService = TestBed.inject(PostsService);
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
    element = fixture.nativeElement.querySelector('.models h2');
    expect(element.textContent).toContain(modelStoreStub.title);
  });

  it('should download postsM', () => {
    component.ngOnInit();
    component.postsM$.subscribe(post => expect(post).toEqual([modelStoreStub]));
  });

  it('should loading to be false', () => {
    component.ngOnInit();
    component.loading$.subscribe(post => expect(post).toBeFalse());
  });

  it('should call store dispatch()', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(modelsActions.load());
  });
});
