import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '@admin/shared/services/auth.service';
import { LoginPageComponent } from './login-page.component';


describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let authService: AuthService;
  let router: Router;
  let element: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain tags', () => {
    element = fixture.nativeElement;
    expect(element.innerHTML).toContain('form');
    expect(element.innerHTML).toContain('input');
    expect(element.innerHTML).toContain('a');
  });

  it('should contain "Вход в панель администратора"', () => {
    element = fixture.nativeElement.querySelector('h2');
    expect(element.textContent).toContain('Вход в панель администратора');
  });

  it('should contain "Email"', () => {
    element = fixture.nativeElement.querySelector('label');
    expect(element.textContent).toContain('Email');
  });

  it('should contain "Пароль"', () => {
    element = fixture.nativeElement.querySelectorAll('label')[1];
    expect(element.textContent).toContain('Пароль');
  });

  it('should contain "Войти"', () => {
    element = fixture.nativeElement.querySelector('.btn-login');
    expect(element.textContent).toContain('Войти');
  });

  it('should contain "Регистрация"', () => {
    element = fixture.nativeElement.querySelector('.registration');
    expect(element.textContent).toContain('Регистрация');
  });

  it('should submit() call router navigate and reset form', () => {
    spyOn(router, 'navigate');
    spyOn(authService, 'login').and.returnValue(of({}));
    component.form.setValue({ email: 'email@yandex.ru', password: 'password' });
    component.submit();
    fixture.detectChanges();
    expect(component.form.value).toEqual({ email: null, password: null });
    expect(router.navigate).toHaveBeenCalledTimes(1);
  });
});
