import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';


describe('AlertService', () => {
  let alertService: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertService]
    });

    alertService = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(alertService).toBeTruthy();
  });

  it('should success() write Subject', () => {
    spyOn(alertService.alert$, 'next');
    alertService.success('success');
    expect(alertService.alert$.next).toHaveBeenCalledWith({ type: 'success', text: 'success' });
  });

  it('should warning() write Subject', () => {
    spyOn(alertService.alert$, 'next');
    alertService.warning('warning');
    expect(alertService.alert$.next).toHaveBeenCalledWith({ type: 'warning', text: 'warning' });
  });

  it('should danger() write Subject', () => {
    spyOn(alertService.alert$, 'next');
    alertService.danger('danger');
    expect(alertService.alert$.next).toHaveBeenCalledWith({ type: 'danger', text: 'danger' });
  });
});
