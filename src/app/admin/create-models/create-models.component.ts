import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { IPost } from '@app/shared/interface';
import { PostsService } from '@app/shared/posts.service';
import { AlertService } from '@admin/shared/services/alert.service';


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

  constructor(
    private readonly postsService: PostsService,
    private readonly alertService: AlertService
  ) { }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const post: IPost = {
      title: this.form.value.title,
      text: this.form.value.text,
      date: new Date()
    };

    this.postsService.createModel(post)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.form.reset();
          this.alertService.success('Модель успешно создана');
        },
        error: (error) => {
          this.alertService.danger(`Модель не создана. Ошибка: ${error.message}`);
        }
      });
  }

}
