import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { IComment, IPost } from '../shared/interface';
import { PostsService } from '../shared/posts.service';
import { CommentsService } from '../shared/comments.service';
import { AuthService } from '../admin/shared/services/auth.service';


@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})

export class NewsPageComponent implements OnInit {

  formComment: FormGroup;

  commentsList$: Observable<IComment[]> = EMPTY;
  postsN$: Observable<IPost[]> = EMPTY;

  check$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.formComment = new FormGroup({
      text: new FormControl(null, Validators.required)
    });

    this.postsN$ = this.postsService.getAllNews();
    this.commentsList$ = this.check$
      .pipe(switchMap(() => this.commentsService.getAllComments()));
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

  deleteComment(id: string): void {
    if (this.authService.isAuthenticated()) {
      this.commentsService.deleteComment(id)
        .pipe(take(1))
        .subscribe(() => this.check$.next(true));
    }
  }

}
