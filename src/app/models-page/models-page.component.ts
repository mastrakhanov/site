import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from '../shared/interface';
import {ActivatedRoute} from '@angular/router';
import {PostsService} from '../shared/posts.service';

@Component({
  selector: 'app-models-page',
  templateUrl: './models-page.component.html',
  styleUrls: ['./models-page.component.scss']
})
export class ModelsPageComponent implements OnInit {

  postsM$: Observable<Post[]>;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.postsM$ = this.postsService.getAllModels();
  }

}
