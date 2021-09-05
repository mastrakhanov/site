import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';

import { PostsService } from '../../shared/posts.service';
import { IPost } from '../../shared/interface';
import { AlertService } from '../shared/services/alert.service';


@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit {

  form: FormGroup;

  post: IPost;
  submitted = false;

  constructor(
    private readonly postsService: PostsService,
    private readonly route: ActivatedRoute,
    private readonly alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => this.postsService.getNewById(params['id']))
    )
    .subscribe((post: IPost) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      });
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.postsService.updateNew({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title
    }).pipe(take(1))
      .subscribe(() => {
        this.submitted = false;
        this.alertService.success('Новость успешно изменена');
      });
  }

}
