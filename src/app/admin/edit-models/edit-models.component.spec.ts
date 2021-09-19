import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { QuillModule } from 'ngx-quill';

import { MockPostsService } from 'src/testing/mock-posts.service';
import { IPost } from '@app/shared/interface';
import { PostsService } from '@app/shared/posts.service';
import { AlertService } from '@admin/shared/services/alert.service';

import { EditModelsComponent } from './edit-models.component';


describe('EditModelsComponent', () => {
  let component: EditModelsComponent;
  let fixture: ComponentFixture<EditModelsComponent>;
  let alertService: AlertService;
  let element: HTMLElement;

  const postStub: IPost = { id: '1', title: 'title', text: 'text', date: new Date(0) };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [EditModelsComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        QuillModule
      ],
      providers: [
        { provide: PostsService, useClass: MockPostsService },
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
        AlertService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModelsComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertService);
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

  it('should post value to be postStub', () => {
    component.ngOnInit();
    expect(component.post).toEqual(postStub);
  });

  it('should form value must obtained from post', () => {
    component.ngOnInit();
    expect(component.form.value).toEqual({ title: 'title', text: 'text' });
  });

  it('should call alertService success()', () => {
    spyOn(alertService, 'success');
    component.form.setValue({ title: 'title', text: 'text' });
    component.submit();
    expect(alertService.success).toHaveBeenCalledWith('Модель успешно изменена');
  });
});
