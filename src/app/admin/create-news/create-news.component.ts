import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interface';
import {PostsService} from '../../shared/posts.service';
import {AlertService} from '../shared/services/alert.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss']
})
export class CreateNewsComponent implements OnInit, OnDestroy {

  constructor(private postsService: PostsService,
              private alertService: AlertService) {}

  form: FormGroup;
  cSub: Subscription;

  ngOnInit() {
  this.form = new FormGroup({
    title: new FormControl(null, Validators.required),
    text: new FormControl(null, Validators.required)
  });
}

  submit() {
    if (this.form.invalid) {
      return;
    }
    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      date: new Date()
    };

    this.cSub = this.postsService.createNews(post).subscribe(() => {
      this.form.reset();
      this.alertService.success('Новость успешно создана');
    });
  }

  ngOnDestroy() {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }
}
