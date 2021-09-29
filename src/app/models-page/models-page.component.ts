import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';

import { IPost } from '@app/shared/interface';
import * as fromRoot from '@app/store/reducers';
import * as modelsActions from '@app/store/actions/models';


@Component({
  selector: 'app-models-page',
  templateUrl: './models-page.component.html',
  styleUrls: ['./models-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelsPageComponent implements OnInit {

  postsM$: Observable<IPost[]> = EMPTY;
  loading$: Observable<boolean> = EMPTY;

  constructor(private readonly store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.store.dispatch(modelsActions.load());

    this.postsM$ = this.store.select(fromRoot.selectModelsAll);
    this.loading$ = this.store.select(fromRoot.selectLoadingModels);
  }

}
