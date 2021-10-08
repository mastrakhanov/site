import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { PostsService } from '@app/shared/posts.service';
import { IPost } from '@app/shared/interface';
import * as newsActions from '@app/store/actions/news';
import * as fromRoot from '@app/store/reducers';


@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditNewsComponent implements OnInit, OnDestroy {

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
      switchMap(({ id }) => this.postsService.getNewsById(id))
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

    this.store.dispatch(newsActions.update({
      news: {
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
