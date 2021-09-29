import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CreateLayoutComponent } from './create-layout.component';


describe('CreateLayoutComponent', () => {
  let component: CreateLayoutComponent;
  let fixture: ComponentFixture<CreateLayoutComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateLayoutComponent],
      imports: [
        RouterTestingModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLayoutComponent);
    component = fixture.componentInstance;
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
    expect(element.innerHTML).toContain('router-outlet');
  });

  it('should contain "Создать новость"', () => {
    element = fixture.nativeElement.querySelector('.create-layout__a');
    expect(element.textContent).toContain('Создать новость');
  });

  it('should contain "Создать модель"', () => {
    element = fixture.nativeElement.querySelectorAll('.create-layout__a')[1];
    expect(element.textContent).toContain('Создать модель');
  });
});
