import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AlertService } from '@admin/shared/services/alert.service';

import { AlertComponent } from './alert.component';


describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alertService: AlertService;
  let element: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [AlertService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertService);
    component.text = 'text';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain text', () => {
    element = fixture.nativeElement.querySelector('p');
    expect(element.textContent).toContain(component.text);
  });

  it('should come text and title', () => {
    alertService.success('success');
    component.ngOnInit();
    expect(component.text).toBe('success');
    expect(component.type).toBe('success');
  });

  it('should clean text after 5000 ms', fakeAsync(() => {
    alertService.success('success');
    component.ngOnInit();
    tick(5000);
    expect(component.text).toBe('');
  }));
});
