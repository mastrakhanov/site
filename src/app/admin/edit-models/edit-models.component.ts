import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IPost } from '@app/shared/interface';
import { PostsService } from '@app/shared/posts.service';
import * as fromRoot from '@app/store/reducers';
import * as modelsActions from '@app/store/actions/models';


@Component({
  selector: 'app-edit-models',
  templateUrl: './edit-models.component.html',
  styleUrls: ['./edit-models.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditModelsComponent implements OnInit, OnDestroy {

  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    text: new FormControl(null, Validators.required)
  });

  post?: IPost;
  submitted = false;

  disabled$: Observable<boolean> = EMPTY;

  private formSub: Subscription | null = null;

  constructor(
    private readonly postsService: PostsService,
    private readonly route: ActivatedRoute,
    private readonly store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      // eslint-disable-next-line @typescript-eslint/dot-notation
      switchMap((params: Params) => this.postsService.getModelById(params['id']))
    )
    .subscribe((post: IPost) => {
      this.post = post;
      this.form.setValue({ title: post.title, text: post.text });
    });

    this.disabled$ = this.form.statusChanges.pipe(map(x => x === 'INVALID'));
    this.formSub = this.form.valueChanges.subscribe(() => this.submitted = false);
  }

  submit(): void {
    if (this.form?.invalid) {
      return;
    }

    this.submitted = true;

    this.store.dispatch(modelsActions.update({
      model: {
        ...this.post,
        text: this.form?.value.text,
        title: this.form?.value.title
      } as IPost
    }));
  }

  ngOnDestroy(): void {
    if (this.formSub) { this.formSub.unsubscribe(); }
  }

}
