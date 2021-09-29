import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPost } from '@app/shared/interface';
import * as newsActions from '@app/store/actions/news';
import * as fromRoot from '@app/store/reducers';


@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateNewsComponent {

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

    const news: IPost = {
      title: this.form.value.title,
      text: this.form.value.text,
      date: new Date()
    };

    this.store.dispatch(newsActions.create({ news }));

    this.form.reset();
  }

}
