import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { registerLocaleData } from '@angular/common';
import ruLocale from '@angular/common/locales/ru';

import { IPost } from '@app/shared/interface';
import { PostsService } from '@app/shared/posts.service';
import { AlertService } from '@admin/shared/services/alert.service';
import { SearchPipe } from '@admin/shared/search.pipe';
import { MockPostsService } from 'src/testing/mock-posts.service';

import { EditLayoutComponent } from './edit-layout.component';


describe('EditLayoutComponent', () => {
  let component: EditLayoutComponent;
  let fixture: ComponentFixture<EditLayoutComponent>;
  let postsService: PostsService;
  let alertService: AlertService;
  let element: HTMLElement;

  const postStub: IPost = { id: '1', title: 'title', text: 'text', date: new Date(0) };

  beforeEach(async () => {
    registerLocaleData(ruLocale, 'ru');
    TestBed.configureTestingModule({
      declarations: [EditLayoutComponent, SearchPipe],
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: PostsService, useClass: MockPostsService },
        AlertService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLayoutComponent);
    component = fixture.componentInstance;
    postsService = TestBed.inject(PostsService);
    alertService = TestBed.inject(AlertService);
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
    component.postsNews$.subscribe(news => expect(news).toEqual([postStub]));
  });

  it('should return all models', () => {
    component.ngOnInit();
    component.postsModels$.subscribe(models => expect(models).toEqual([postStub]));
  });

  it('should call removeNew()', () => {
    spyOn(component, 'removeNew');
    element = fixture.nativeElement.querySelector('.edit-layout__button .btn-remove');
    element.click();
    expect(component.removeNew).toHaveBeenCalledTimes(1);
  });

  it('should call removeModel()', () => {
    spyOn(component, 'removeModel');
    element = fixture.nativeElement.querySelectorAll('.edit-layout__button .btn-remove')[1];
    element.click();
    expect(component.removeModel).toHaveBeenCalledTimes(1);
  });

  it('should removeNew() return undefined and call alertService success()', () => {
    spyOn(alertService, 'success');
    expect(component.removeNew('1')).toBeUndefined();
    expect(alertService.success).toHaveBeenCalledWith('Новость успешно удалена');
  });

  it('should removeModel() return undefined and call alertService success()', () => {
    spyOn(alertService, 'success');
    expect(component.removeModel('1')).toBeUndefined();
    expect(alertService.success).toHaveBeenCalledWith('Модель успешно удалена');
  });
});
