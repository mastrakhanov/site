import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LOCAL_STORAGE } from '@ng-web-apis/common';

import { IFbAuthResponse, IUser } from '@app/shared/interface';
import { environment } from '@src/environments/environment';


@Injectable({ providedIn: 'root' })

export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(
    private readonly http: HttpClient,
    @Inject(LOCAL_STORAGE) private readonly localStorage: Storage
  ) { }

  get token(): string | null {
    const expiresDate: Date = new Date(this.localStorage.getItem('fb-token-exp') as string);

    if (new Date() > expiresDate) {
      this.logout();
      return null;
    }

    return this.localStorage.getItem('fb-token');
  }

  login(user: IUser): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post<IFbAuthResponse | null>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap((response: IFbAuthResponse | null) => this.setToken(response)),
        catchError(err => this.handleError(err))
      );
  }

  logout = (): void => this.setToken(null);

  isAuthenticated = (): boolean => !!this.token;

  private handleError(error: HttpErrorResponse): Observable<never> {
    const { message } = error.error.error;
    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email нет');
        break;
    }

    return throwError(error);
  }

  private setToken(response: IFbAuthResponse | null): void {
    if (response) {
      const expiresDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      this.localStorage.setItem('fb-token', response.idToken);
      this.localStorage.setItem('fb-token-exp', expiresDate.toString());
    } else {
      this.localStorage.clear();
    }
  }

}
