import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from '@app/footer/footer.component';
import { ConstructorsPageComponent } from './constructors-page.component';


describe('ConstructorsPageComponent', () => {
  let component: ConstructorsPageComponent;
  let fixture: ComponentFixture<ConstructorsPageComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ConstructorsPageComponent, FooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain tags', () => {
    element = fixture.nativeElement;
    expect(element.innerHTML).toContain('img');
    expect(element.innerHTML).toContain('app-footer');
  });
});
