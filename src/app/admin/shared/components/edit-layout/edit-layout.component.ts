import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../../../shared/posts.service';
import {Post} from '../../../../shared/interface';
import {Subscription} from 'rxjs';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-edit-layout',
  templateUrl: './edit-layout.component.html',
  styleUrls: ['./edit-layout.component.scss']
})

export class EditLayoutComponent implements OnInit, OnDestroy {

  postsNews: Post[] = [];
  postsModels: Post[] = [];
  nSub: Subscription;
  mSub: Subscription;
  rnSub: Subscription;
  rmSub: Subscription;
  searchStr = '';

  constructor(private postService: PostsService,
              private alert: AlertService) {}

  ngOnInit() {
    this.nSub = this.postService.getAllNews().subscribe(posts => {
    this.postsNews = posts;
    });
    this.mSub = this.postService.getAllModels().subscribe(posts => {
      this.postsModels = posts;
    });
  }

  removeN(id: string) {
    this.rnSub = this.postService.removeNew(id).subscribe(() => {
    this.postsNews = this.postsNews.filter(postN => postN.id !== id);
    this.alert.success('Новость успешно удалена');
    });
  }

  removeM(id: string) {
    this.rmSub = this.postService.removeModel(id).subscribe(() => {
    this.postsModels = this.postsModels.filter(postM => postM.id !== id);
    this.alert.success('Модель успешно удалена');
    });
  }

  ngOnDestroy() {
    if (this.mSub) {
      this.mSub.unsubscribe();
    }
    if (this.nSub) {
      this.nSub.unsubscribe();
    }
    if (this.rnSub) {
      this.rnSub.unsubscribe();
    }
    if (this.rmSub) {
      this.rmSub.unsubscribe();
    }
  }
}
