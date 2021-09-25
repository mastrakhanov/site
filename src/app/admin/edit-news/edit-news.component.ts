import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { PostsService } from '@app/shared/posts.service';
import { IPost } from '@app/shared/interface';
import { AlertService } from '@admin/shared/services/alert.service';


@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditNewsComponent implements OnInit {

  form?: FormGroup;

  post?: IPost;
  submitted = false;

  disabled$: Observable<boolean> = EMPTY;

  constructor(
    private readonly postsService: PostsService,
    private readonly route: ActivatedRoute,
    private readonly alertService: AlertService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      // eslint-disable-next-line @typescript-eslint/dot-notation
      switchMap((params: Params) => this.postsService.getNewById(params['id']))
    )
    .subscribe((post: IPost) => {
      this.post = post;

      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      });

      this.disabled$ = this.form.statusChanges.pipe(map(x => x === 'INVALID'));
      this.changeDetectorRef.markForCheck();
    });
  }

  submit(): void {
    if (this.form?.invalid) {
      return;
    }

    this.submitted = true;

    this.postsService.updateNew({
      ...this.post,
      text: this.form?.value.text,
      title: this.form?.value.title
    } as IPost).pipe(take(1))
      .subscribe({
        next: () => {
          this.submitted = false;
          this.alertService.success('Новость успешно изменена');
          this.changeDetectorRef.markForCheck();
        },
        error: (error) => {
          this.alertService.danger(`Новость не изменена. Ошибка: ${error.message}`);
        }
      });
  }

}
