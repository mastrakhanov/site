import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { IComment, IPost } from '@app/shared/interface';
import { PostsService } from '@app/shared/posts.service';
import { CommentsService } from '@app/shared/comments.service';
import { AuthService } from '@admin/shared/services/auth.service';


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

  check$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.postsN$ = this.postsService.getAllNews();
    this.commentsList$ = this.check$
      .pipe(switchMap(() => this.commentsService.getAllComments()));
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

    this.commentsService.createComment(comment)
      .pipe(take(1))
      .subscribe(() => this.check$.next(true));

    this.formComment.reset();
  }

  deleteComment(id: string | undefined): void {
    if (this.authService.isAuthenticated() && id) {
      this.commentsService.removeComment(id)
        .pipe(take(1))
        .subscribe(() => this.check$.next(true));
    }
  }

}
