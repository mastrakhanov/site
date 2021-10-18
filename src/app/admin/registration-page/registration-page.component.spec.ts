import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationPageComponent } from './registration-page.component';


describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationPageComponent],
      imports: [
        ReactiveFormsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain tags', () => {
    element = fixture.nativeElement;
    expect(element.innerHTML).toContain('form');
    expect(element.innerHTML).toContain('select');
    expect(element.innerHTML).toContain('input');
    expect(element.innerHTML).toContain('i');
  });

  it('should contain "Регистрация"', () => {
    element = fixture.nativeElement.querySelector('h1');
    expect(element.textContent).toContain('Регистрация');
  });

  it('should contain "Заполните информацию о себе"', () => {
    element = fixture.nativeElement.querySelector('h2');
    expect(element.textContent).toContain('Заполните информацию о себе');
  });

  it('should contain "Зарегистрироваться"', () => {
    element = fixture.nativeElement.querySelector('.btn-login');
    expect(element.textContent).toContain('Зарегистрироваться');
  });

  it('should isVisible to be true', () => {
    element = fixture.nativeElement.querySelector('.fa-chevron-circle-down');
    element.click();
    expect(component.isVisible).toBeTrue();
  });

  it('form should contain name, surname, email, personal, pass, confPass, city, country, about controls', () => {
    expect(component.form.contains('name')).toBeTrue();
    expect(component.form.contains('surname')).toBeTrue();
    expect(component.form.contains('email')).toBeTrue();
    expect(component.form.contains('personal')).toBeTrue();
    expect(component.form.contains('pass')).toBeTrue();
    expect(component.form.contains('confPass')).toBeTrue();
    expect(component.form.contains('city')).toBeTrue();
    expect(component.form.contains('country')).toBeTrue();
    expect(component.form.contains('about')).toBeTrue();
  });
});
