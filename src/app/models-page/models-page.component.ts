import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

import { IPost } from '@app/shared/interface';
import { PostsService } from '@app/shared/posts.service';


@Component({
  selector: 'app-models-page',
  templateUrl: './models-page.component.html',
  styleUrls: ['./models-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelsPageComponent implements OnInit {

  postsM$: Observable<IPost[]> = EMPTY;

  constructor(private readonly postsService: PostsService) { }

  ngOnInit(): void {
    this.postsM$ = this.postsService.getAllModels();
  }

}
