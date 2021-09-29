import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from '@app/footer/footer.component';
import { HistoryPageComponent } from './history-page.component';


describe('HistoryPageComponent', () => {
  let component: HistoryPageComponent;
  let fixture: ComponentFixture<HistoryPageComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryPageComponent, FooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain tags', () => {
    element = fixture.nativeElement;
    expect(element.innerHTML).toContain('ul');
    expect(element.innerHTML).toContain('li');
    expect(element.innerHTML).toContain('img');
    expect(element.innerHTML).toContain('app-footer');
  });

  it('should contain "Bugatti"', () => {
    element = fixture.nativeElement.querySelector('h2');
    expect(element.textContent).toContain('Bugatti');
  });
});
