import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from '@app/footer/footer.component';
import { MainPageComponent } from './main-page.component';


describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [MainPageComponent/*, FooterComponent*/],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should contain tags', () => {
  //   element = fixture.nativeElement;
  //   expect(element.innerHTML).toContain('aside');
  //   expect(element.innerHTML).toContain('article');
  //   expect(element.innerHTML).toContain('app-footer');
  // });
  //
  // it('should contain "Bugatti"', () => {
  //   element = fixture.nativeElement.querySelector('h1');
  //   expect(element.textContent).toContain('Bugatti');
  // });
});
