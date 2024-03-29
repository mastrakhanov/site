import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IUser } from '@app/shared/interface';
import { AuthService } from '@admin/shared/services/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  submitted = false;
  message?: string;

  private aSub: Subscription | null = null;

  constructor(
    public readonly auth: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ loginAgain, authFailed }) => {
      if (loginAgain) {
        this.message = 'Пожалуйста, введите данные';
      } else if (authFailed) {
        this.message = 'Сессия истекла. Введите данные заново.';
      }
    });

    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/admin', 'create']);
    }
  }

  submit(): FormGroup | void {
    if (this.form.invalid) {
      return this.form;
    }

    this.submitted = true;

    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.aSub = this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'create']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
