import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from '@app/footer/footer.component';
import { ContactsPageComponent } from './contacts-page.component';


describe('ContactsPageComponent', () => {
  let component: ContactsPageComponent;
  let fixture: ComponentFixture<ContactsPageComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactsPageComponent, FooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain tags', () => {
    element = fixture.nativeElement;
    expect(element.innerHTML).toContain('iframe');
    expect(element.innerHTML).toContain('app-footer');
  });

  it('should contain "КОНТАКТЫ"', () => {
    element = fixture.nativeElement.querySelector('.contacts-info__contacts');
    expect(element.textContent).toContain('КОНТАКТЫ');
  });

  it('should contain "Телефон"', () => {
    element = fixture.nativeElement.querySelector('.contacts-info__mobile');
    expect(element.textContent).toContain('Телефон');
  });

  it('should contain "E-mail"', () => {
    element = fixture.nativeElement.querySelector('.contacts-info__mail');
    expect(element.textContent).toContain('E-mail');
  });
});
