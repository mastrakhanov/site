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
import { modelStub } from 'src/testing/model-stub';

import { PostsService } from '@app/shared/posts.service';
import * as modelsActions from '@app/store/actions/models';

import { EditModelsComponent } from './edit-models.component';


describe('EditModelsComponent', () => {
  let component: EditModelsComponent;
  let fixture: ComponentFixture<EditModelsComponent>;
  let store: Store;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditModelsComponent],
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
    fixture = TestBed.createComponent(EditModelsComponent);
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

  it('should contain "Редактирование модели автомобиля"', () => {
    element = fixture.nativeElement.querySelector('h2');
    expect(element.textContent).toContain('Редактирование модели автомобиля');
  });

  it('should contain "Название модели"', () => {
    element = fixture.nativeElement.querySelector('label');
    expect(element.textContent).toContain('Название модели');
  });

  it('should contain "Контент модели автомобиля"', () => {
    element = fixture.nativeElement.querySelectorAll('label')[1];
    expect(element.textContent).toContain('Контент модели автомобиля');
  });

  it('should contain "Обновить"', () => {
    element = fixture.nativeElement.querySelector('.btn-login');
    expect(element.textContent).toContain('Обновить');
  });

  it('form should contain title and text controls', () => {
    expect(component.form.contains('title')).toBeTrue();
    expect(component.form.contains('text')).toBeTrue();
  });

  it('should post value to be modelStub', () => {
    component.ngOnInit();
    expect(component.post).toEqual(modelStub);
  });

  it('should form value must obtained from post', () => {
    component.ngOnInit();
    expect(component.form.value).toEqual({ title: modelStub.title, text: modelStub.text });
  });

  it('submit() should call store dispatch()', () => {
    spyOn(store, 'dispatch');
    component.submit();
    expect(store.dispatch).toHaveBeenCalledWith(modelsActions.update({ model: modelStub }));
  });
});
