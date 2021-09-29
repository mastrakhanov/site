import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, tap, switchMap, delay, filter } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AlertService } from '@admin/shared/services/alert.service';
import { PostsService } from '@app/shared/posts.service';
import * as newsActions from '@app/store/actions/news';


@Injectable()
export class NewsEffects {
  load$ = createEffect(() => this.actions$.pipe(
    ofType(newsActions.load),
    switchMap(() => this.postsService.getAllNews()
      .pipe(
        map(news => newsActions.loaded({ news })),
        catchError(() => of(newsActions.loadError()))
      )
    ))
  );

  loadError$ = createEffect(() => this.actions$.pipe(
    ofType(newsActions.loadError),
    tap(() => console.warn(`Не удалось загрузить новости, повторная загрузка через ${environment.requestRetryDelay} мс.`)),
    delay(environment.requestRetryDelay),
    switchMap(() => of(newsActions.load()))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(newsActions.create),
    filter(({ news }) => !!news),
    switchMap(({ news }) => this.postsService.createNews(news)
      .pipe(
        map(() => newsActions.load()),
        tap(() => this.alertService.success('Новость успешно создана')),
        catchError(error => of(newsActions.createError({ error })))
      ))
  ));

  createError$ = createEffect(() => this.actions$.pipe(
    ofType(newsActions.createError),
    tap(({ error }) => this.alertService.danger(`Новость не создана. Ошибка: ${error.message}`))
  ), { dispatch: false });

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(newsActions.remove),
    filter(({ id }) => !!id),
    switchMap(({ id }) => this.postsService.removeNews(id)
      .pipe(
        map(() => newsActions.remove({ id })),
        tap(() => this.alertService.success('Новость успешно удалена')),
        catchError(error => of(newsActions.removeError({ error })))
      ))
  ), { dispatch: false });

  removeError$ = createEffect(() => this.actions$.pipe(
    ofType(newsActions.removeError),
    tap(({ error }) => this.alertService.danger(`Новость не удалена. Ошибка: ${error.message}`))
  ), { dispatch: false });

  update$ = createEffect(() => this.actions$.pipe(
    ofType(newsActions.update),
    filter(({ news }) => !!news),
    switchMap(({ news }) => this.postsService.updateNews(news)
      .pipe(
        map(() => newsActions.load()),
        tap(() => this.alertService.success('Новость успешно изменена')),
        catchError(error => of(newsActions.updateError({ error })))
      ))
  ));

  updateError$ = createEffect(() => this.actions$.pipe(
    ofType(newsActions.updateError),
    tap(({ error }) => this.alertService.danger(`Новость не изменена. Ошибка: ${error.message}`))
  ), { dispatch: false });

  constructor(
    private readonly actions$: Actions,
    private readonly alertService: AlertService,
    private readonly postsService: PostsService
  ) { }
}
