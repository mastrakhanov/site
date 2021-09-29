import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { registerLocaleData } from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import { mockStoreInitialState, modelStoreStub, newsStoreStub } from 'src/testing/mock-store-initial-state';
import { MockPostsService } from 'src/testing/mock-posts.service';

import { PostsService } from '@app/shared/posts.service';
import { SearchPipe } from '@admin/shared/search.pipe';
import * as modelsActions from '@app/store/actions/models';
import * as newsActions from '@app/store/actions/news';

import { EditLayoutComponent } from './edit-layout.component';


describe('EditLayoutComponent', () => {
  let component: EditLayoutComponent;
  let fixture: ComponentFixture<EditLayoutComponent>;
  let postsService: PostsService;
  let store: Store;
  let element: HTMLElement;

  beforeEach(async () => {
    registerLocaleData(ruLocale, 'ru');
    await TestBed.configureTestingModule({
      declarations: [EditLayoutComponent, SearchPipe],
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        provideMockStore({ initialState: mockStoreInitialState }),
        { provide: PostsService, useClass: MockPostsService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLayoutComponent);
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
    expect(element.innerHTML).toContain('table');
    expect(element.innerHTML).toContain('thead');
    expect(element.innerHTML).toContain('tbody');
    expect(element.innerHTML).toContain('input');
  });

  it('should contain "Список новостей"', () => {
    element = fixture.nativeElement.querySelector('.edit-layout__item h2');
    expect(element.textContent).toContain('Список новостей');
  });

  it('should contain "Список новостей"', () => {
    element = fixture.nativeElement.querySelector('.edit-layout__item tr');
    expect(element.textContent).toContain('№');
    expect(element.textContent).toContain('Название');
    expect(element.textContent).toContain('Дата');
    expect(element.textContent).toContain('Действие');
  });

  it('should contain "Открыть"', () => {
    element = fixture.nativeElement.querySelector('.edit-layout__button .btn');
    expect(element.textContent).toContain('Открыть');
  });

  it('should contain "Удалить"', () => {
    element = fixture.nativeElement.querySelector('.edit-layout__button .btn-remove');
    expect(element.textContent).toContain('Удалить');
  });

  it('should contain "Список моделей"', () => {
    element = fixture.nativeElement.querySelectorAll('.edit-layout__item h2')[1];
    expect(element.textContent).toContain('Список моделей');
  });

  it('should contain "Список моделей"', () => {
    element = fixture.nativeElement.querySelectorAll('.edit-layout__item tr')[2];
    expect(element.textContent).toContain('№');
    expect(element.textContent).toContain('Название');
    expect(element.textContent).toContain('Дата');
    expect(element.textContent).toContain('Действие');
  });

  it('should contain "Открыть"', () => {
    element = fixture.nativeElement.querySelectorAll('.edit-layout__button .btn')[1];
    expect(element.textContent).toContain('Открыть');
  });

  it('should contain "Удалить"', () => {
    element = fixture.nativeElement.querySelectorAll('.edit-layout__button .btn-remove')[1];
    expect(element.textContent).toContain('Удалить');
  });

  it('should return all news', () => {
    component.ngOnInit();
    component.postsNews$.subscribe(news => expect(news).toEqual([newsStoreStub]));
  });

  it('should return all models', () => {
    component.ngOnInit();
    component.postsModels$.subscribe(models => expect(models).toEqual([modelStoreStub]));
  });

  it('should loadingNews$ to be false', () => {
    component.ngOnInit();
    component.loadingNews$.subscribe(loading => expect(loading).toBeFalse());
  });

  it('should loadingModels$ to be false', () => {
    component.ngOnInit();
    component.loadingModels$.subscribe(loading => expect(loading).toBeFalse());
  });

  it('should call store dispatch()', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(newsActions.load());
    expect(store.dispatch).toHaveBeenCalledWith(modelsActions.load());
  });

  it('should call removeNew()', () => {
    spyOn(component, 'removeNews');
    element = fixture.nativeElement.querySelector('.edit-layout__button .btn-remove');
    element.click();
    expect(component.removeNews).toHaveBeenCalledTimes(1);
  });

  it('should call removeModel()', () => {
    spyOn(component, 'removeModel');
    element = fixture.nativeElement.querySelectorAll('.edit-layout__button .btn-remove')[1];
    element.click();
    expect(component.removeModel).toHaveBeenCalledTimes(1);
  });

  it('removeNews() should call store dispatch()', () => {
    spyOn(store, 'dispatch');
    component.removeNews('1');
    expect(store.dispatch).toHaveBeenCalledWith(newsActions.remove({ id: '1' }));
  });

  it('removeModel() should call store dispatch()', () => {
    spyOn(store, 'dispatch');
    component.removeModel('1');
    expect(store.dispatch).toHaveBeenCalledWith(modelsActions.remove({ id: '1' }));
  });
});
