import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interface';
import {PostsService} from '../../shared/posts.service';
import {AlertService} from '../shared/services/alert.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-create-models',
  templateUrl: './create-models.component.html',
  styleUrls: ['./create-models.component.scss']
})
export class CreateModelsComponent implements OnInit, OnDestroy {

  form: FormGroup;
  cSub: Subscription;

  constructor(private postsService: PostsService,
              private alertService: AlertService) { }

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

    this.cSub = this.postsService.createModels(post).subscribe(() => {
      this.form.reset();
      this.alertService.success('Модель успешно создана');
    });
  }

  ngOnDestroy() {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }
}
