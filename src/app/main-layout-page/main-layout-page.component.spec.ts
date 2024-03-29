import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { MainLayoutPageComponent } from './main-layout-page.component';


describe('MainLayoutPageComponent', () => {
  let component: MainLayoutPageComponent;
  let fixture: ComponentFixture<MainLayoutPageComponent>;
  let router: Router;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainLayoutPageComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain tags', () => {
    element = fixture.nativeElement;
    expect(element.innerHTML).toContain('nav');
    expect(element.innerHTML).toContain('ul');
    expect(element.innerHTML).toContain('li');
    expect(element.innerHTML).toContain('a');
    expect(element.innerHTML).toContain('img');
    expect(element.innerHTML).toContain('router-outlet');
  });

  it('should contain titles', () => {
    element = fixture.nativeElement.querySelector('ul');
    expect(element.textContent).toContain('Главная');
    expect(element.textContent).toContain('История');
    expect(element.textContent).toContain('Конструкторы');
    expect(element.textContent).toContain('Модельный ряд');
    expect(element.textContent).toContain('Новости');
    expect(element.textContent).toContain('Контакты');
  });

  it('should link to /', (done) => {
    element = fixture.nativeElement.querySelector('li');

    fixture.ngZone.run(() => {
      element.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(router.url).toBe('/');
      });
    });

    done();
  });
});
