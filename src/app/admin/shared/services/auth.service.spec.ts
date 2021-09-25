import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { IFbAuthResponse, IUser } from '@app/shared/interface';
import { AuthService } from './auth.service';


describe('AuthService', () => {
  let authService: AuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const userStub: IUser = { email: 'xxx@yandex.ru', password: 'password', returnSecureToken: true };
  const authResponseStub: IFbAuthResponse = { idToken: 'token', expiresIn: '5000' };

  function loginMock(): void {
    authService.login(userStub).subscribe(response => expect(response).toEqual(authResponseStub));
    const req = httpTestingController.expectOne(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`);
    expect(req.request.method).toEqual('POST');

    req.flush(authResponseStub);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login() return authResponseStub', () => {
    authService.login(userStub).subscribe(response => expect(response).toEqual(authResponseStub));
    const req = httpTestingController.expectOne(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`);
    expect(req.request.method).toEqual('POST');

    req.flush(authResponseStub);
  });

  it('should return token', () => {
    loginMock();
    expect(authService.token).toBe('token');
  });

  it('should isAuthenticated to be true', () => {
    loginMock();
    expect(authService.isAuthenticated()).toBeTrue();
  });

  it('should return null', () => {
    loginMock();
    authService.logout();
    expect(authService.token).toBe(null);
  });

  it('should isAuthenticated to be false', () => {
    loginMock();
    authService.logout();
    expect(authService.isAuthenticated()).toBeFalse();
  });
});
