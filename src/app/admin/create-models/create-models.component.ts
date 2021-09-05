import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

import { IPost } from '../../shared/interface';
import { PostsService } from '../../shared/posts.service';
import { AlertService } from '../shared/services/alert.service';


@Component({
  selector: 'app-create-models',
  templateUrl: './create-models.component.html',
  styleUrls: ['./create-models.component.scss']
})
export class CreateModelsComponent {

  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    text: new FormControl(null, Validators.required)
  });

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

    this.postsService.createModels(post)
      .pipe(take(1))
      .subscribe(() => {
        this.form.reset();
        this.alertService.success('Модель успешно создана');
      });
  }

}
