import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPost } from '@app/shared/interface';
import * as modelsActions from '@app/store/actions/models';
import * as fromRoot from '@app/store/reducers';


@Component({
  selector: 'app-create-models',
  templateUrl: './create-models.component.html',
  styleUrls: ['./create-models.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateModelsComponent {

  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    text: new FormControl(null, Validators.required)
  });

  disabled$: Observable<boolean> = this.form.statusChanges.pipe(map(x => x === 'INVALID'));

  constructor(private readonly store: Store<fromRoot.State>) { }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const model: IPost = {
      title: this.form.value.title,
      text: this.form.value.text,
      date: new Date()
    };

    this.store.dispatch(modelsActions.create({ model }));

    this.form.reset();
  }

}
