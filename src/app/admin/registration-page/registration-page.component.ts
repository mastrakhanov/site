import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationPageComponent implements OnInit {

  form!: FormGroup;
  isVisible = false;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[a-z, A-Z, а-я, А-Я]*$')]),
      surname: new FormControl('', [Validators.required, Validators.pattern('^[a-z, A-Z, а-я, А-Я]*$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      personal: new FormControl('', Validators.requiredTrue),
      pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confPass: new FormControl('', [Validators.required]),
      city: new FormControl(''),
      country: new FormControl(''),
      about: new FormControl ('')
    }, this.pwdMatchValidator as ValidatorFn);
  }

  pwdMatchValidator = (form: FormGroup): { mismatch: true } | null =>
    form.get('pass')?.value === form.get('confPass')?.value
      ? null
      : { mismatch: true };

  submit(): FormGroup | void {
    console.log('FORM', this.form);

    if (this.form.invalid) {
      return this.form;
    }
  }

}
