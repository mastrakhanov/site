import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { QuillModule } from 'ngx-quill';

import { mockStoreInitialState } from 'src/testing/mock-store-initial-state';
import { MockPostsService } from 'src/testing/mock-posts.service';
import { PostsService } from '@app/shared/posts.service';

import { CreateNewsComponent } from './create-news.component';


describe('CreateNewsComponent', () => {
  let component: CreateNewsComponent;
  let fixture: ComponentFixture<CreateNewsComponent>;
  let store: Store;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewsComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        QuillModule
      ],
      providers: [
        provideMockStore({ initialState: mockStoreInitialState }),
        { provide: PostsService, useClass: MockPostsService },
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain tags', () => {
    element = fixture.nativeElement;
    expect(element.innerHTML).toContain('input');
    expect(element.innerHTML).toContain('quill-editor');
    expect(element.innerHTML).toContain('form');
  });

  it('should contain "Добавление новости"', () => {
    element = fixture.nativeElement.querySelector('h2');
    expect(element.textContent).toContain('Добавление новости');
  });

  it('should contain "Название новости"', () => {
    element = fixture.nativeElement.querySelector('label');
    expect(element.textContent).toContain('Название новости');
  });

  it('should contain "Контент новости"', () => {
    element = fixture.nativeElement.querySelectorAll('label')[1];
    expect(element.textContent).toContain('Контент новости');
  });

  it('should contain "Добавить новость"', () => {
    element = fixture.nativeElement.querySelector('.btn-login');
    expect(element.textContent).toContain('Добавить новость');
  });

  it('form should contain title and text controls', () => {
    expect(component.form.contains('title')).toBeTrue();
    expect(component.form.contains('text')).toBeTrue();
  });

  it('should call store dispatch() and reset form', () => {
    spyOn(store, 'dispatch');
    component.form.setValue({ title: 'title', text: 'text' });
    component.submit();

    expect(component.form.value).toEqual({ title: null, text: null });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
