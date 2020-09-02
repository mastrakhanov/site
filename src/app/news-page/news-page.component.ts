import {Component, OnDestroy, OnInit} from '@angular/core';
import {Comment, Post} from '../shared/interface';
import {Observable, Subscription} from 'rxjs';

import {PostsService} from '../shared/posts.service';
import {CommentsService} from '../shared/comments.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../admin/shared/services/auth.service';


@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})

export class NewsPageComponent implements OnInit, OnDestroy {

  commentsList: Comment[] = [];
  formCom: FormGroup;
  postsN$: Observable<Post[]>;
  ngcSub: Subscription;
  cSub: Subscription;
  gcSub: Subscription;
  dSub: Subscription;

  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.formCom = new FormGroup({
      text: new FormControl(null, Validators.required)
    });

    this.postsN$ = this.postsService.getAllNews();
    this.ngcSub = this.commentsService.getAllComments().subscribe(comment => {
      this.commentsList = comment;
    });

  }

  submitCom() {
    if (this.formCom.invalid) {
      return;
    }

    const comment: Comment = {
      text: this.formCom.value.text,
      date: new Date()
    };

    this.cSub = this.commentsService.createComment(comment).subscribe(() => {
      this.formCom.reset();
    });

    setTimeout(() => {
      this.gcSub = this.commentsService.getAllComments().subscribe(com => {
        this.commentsList = com;
      });
    }, 1000);
  }

  deleteComment(id: string) {
    if (this.authService.isAuthenticated()) {
      this.dSub = this.commentsService.deleteComment(id).subscribe(() => {
        this.commentsList = this.commentsList.filter(comment => comment.id !== id);
      });
    }
  }

  ngOnDestroy() {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }

    if (this.ngcSub) {
      this.ngcSub.unsubscribe();
    }

    if (this.gcSub) {
      this.gcSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
