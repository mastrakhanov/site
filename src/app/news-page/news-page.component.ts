import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';

import { IComment, IPost } from '@app/shared/interface';
import { AuthService } from '@admin/shared/services/auth.service';
import * as commentsActions from '@app/store/actions/comments';
import * as newsActions from '@app/store/actions/news';
import * as fromRoot from '@app/store/reducers';


@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NewsPageComponent implements OnInit {

  formComment: FormGroup = new FormGroup({
    text: new FormControl(null, Validators.required)
  });

  isAuthenticated?: boolean;

  commentsList$: Observable<IComment[]> = EMPTY;
  postsN$: Observable<IPost[]> = EMPTY;
  loading$: Observable<boolean> = EMPTY;

  constructor(
    private readonly authService: AuthService,
    private readonly store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(newsActions.load());
    this.store.dispatch(commentsActions.load());

    this.postsN$ = this.store.select(fromRoot.selectNewsAll);
    this.commentsList$ = this.store.select(fromRoot.selectCommentsAll);
    this.loading$ = this.store.select(fromRoot.selectLoadingNews);

    this.isAuthenticated = this.authService.isAuthenticated();
  }

  submitComment(): void {
    if (this.formComment.invalid) {
      return;
    }

    const comment: IComment = {
      text: this.formComment.value.text,
      date: new Date()
    };

    this.store.dispatch(commentsActions.create({ comment }));

    this.formComment.reset();
  }

  deleteComment(id: string | undefined): void {
    if (this.authService.isAuthenticated() && id) {
      this.store.dispatch(commentsActions.remove({ id }));
    }
  }

}
