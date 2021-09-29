import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';


describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain tags', () => {
    element = fixture.nativeElement;
    expect(element.innerHTML).toContain('i');
    expect(element.innerHTML).toContain('a');
    expect(element.innerHTML).toContain('footer');
  });

  it('should contain "Bugatti Automobiles" and year', () => {
    element = fixture.nativeElement.querySelector('.footer-content__text p');
    expect(element.textContent).toContain('Bugatti Automobiles');
    expect(element.textContent).toContain(component.year.toString());
  });

  it('should call onTop method', () => {
    spyOn(component, 'onTop');
    element = fixture.nativeElement.querySelector('.fa-arrow-up');
    element.click();
    expect(component.onTop).toHaveBeenCalledTimes(1);
  });
});
