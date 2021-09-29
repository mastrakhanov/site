import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';

import { IPost } from '@app/shared/interface';
import * as fromRoot from '@app/store/reducers';
import * as newsActions from '@app/store/actions/news';
import * as modelsActions from '@app/store/actions/models';


@Component({
  selector: 'app-edit-layout',
  templateUrl: './edit-layout.component.html',
  styleUrls: ['./edit-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditLayoutComponent implements OnInit {

  searchStr = '';

  postsNews$: Observable<IPost[]> = EMPTY;
  postsModels$: Observable<IPost[]> = EMPTY;
  loadingNews$: Observable<boolean> = EMPTY;
  loadingModels$: Observable<boolean> = EMPTY;

  constructor(private readonly store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.store.dispatch(newsActions.load());
    this.store.dispatch(modelsActions.load());

    this.postsModels$ = this.store.select(fromRoot.selectModelsAll);
    this.postsNews$ = this.store.select(fromRoot.selectNewsAll);
    this.loadingNews$ = this.store.select(fromRoot.selectLoadingNews);
    this.loadingModels$ = this.store.select(fromRoot.selectLoadingModels);
  }

  removeNews(id: string | undefined): void {
    if (id) {
      this.store.dispatch(newsActions.remove({ id }));
    }
  }

  removeModel(id: string | undefined): void {
    if (id) {
      this.store.dispatch(modelsActions.remove({ id }));
    }
  }

}
