import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { AlertService } from '@admin/shared/services/alert.service';
import { AlertComponent } from '@admin/shared/components/alert/alert.component';
import { AuthService } from '@admin/shared/services/auth.service';

import { AdminLayoutComponent } from './admin-layout.component';


describe('AdminLayoutComponent', () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;
  let alertService: AlertService;
  let authService: AuthService;
  let router: Router;
  let element: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AdminLayoutComponent, AlertComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [AlertService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    authService.isAuthenticated = () => true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain tags', () => {
    element = fixture.nativeElement;
    expect(element.innerHTML).toContain('nav');
    expect(element.innerHTML).toContain('ul');
    expect(element.innerHTML).toContain('a');
    expect(element.innerHTML).toContain('app-alert');
    expect(element.innerHTML).toContain('router-outlet');
  });

  it('should contain "На главную страницу"', () => {
    element = fixture.nativeElement.querySelectorAll('a')[0];
    expect(element.textContent).toContain('На главную страницу');
  });

  it('should contain "Создать"', () => {
    element = fixture.nativeElement.querySelectorAll('a')[1];
    expect(element.textContent).toContain('Создать');
  });

  it('should contain "Редактировать"', () => {
    element = fixture.nativeElement.querySelectorAll('a')[2];
    expect(element.textContent).toContain('Редактировать');
  });

  it('should contain "Выйти"', () => {
    element = fixture.nativeElement.querySelectorAll('a')[3];
    expect(element.textContent).toContain('Выйти');
  });

  it('should call authService logout() and router navigate()', () => {
    spyOn(authService, 'logout');
    spyOn(router, 'navigate');
    const event: MouseEvent = new MouseEvent('click', { button: 1 });
    component.logout(event);
    expect(authService.logout).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/admin', 'login']);
  });
});
