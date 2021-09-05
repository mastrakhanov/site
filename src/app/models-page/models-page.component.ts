import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

import { IPost } from '../shared/interface';
import { PostsService } from '../shared/posts.service';


@Component({
  selector: 'app-models-page',
  templateUrl: './models-page.component.html',
  styleUrls: ['./models-page.component.scss']
})
export class ModelsPageComponent implements OnInit {

  postsM$: Observable<IPost[]> = EMPTY;

  constructor(private readonly postsService: PostsService) { }

  ngOnInit(): void {
    this.postsM$ = this.postsService.getAllModels();
  }

}
