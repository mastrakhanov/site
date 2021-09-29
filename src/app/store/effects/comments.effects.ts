import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, tap, switchMap, delay, filter } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { CommentsService } from '@app/shared/comments.service';
import * as commentsActions from '@app/store/actions/comments';


@Injectable()
export class CommentsEffects {
  load$ = createEffect(() => this.actions$.pipe(
    ofType(commentsActions.load),
    switchMap(() => this.commentsService.getAllComments()
      .pipe(
        map(comments => commentsActions.loaded({ comments })),
        catchError(() => of(commentsActions.loadError()))
      )
    ))
  );

  loadError$ = createEffect(() => this.actions$.pipe(
    ofType(commentsActions.loadError),
    tap(() => console.warn(`Не удалось загрузить комментарии, повторная загрузка через ${environment.requestRetryDelay} мс.`)),
    delay(environment.requestRetryDelay),
    switchMap(() => of(commentsActions.load()))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(commentsActions.create),
    filter(({ comment }) => !!comment),
    switchMap(({ comment }) => this.commentsService.createComment(comment)
      .pipe(
        map(() => commentsActions.load()),
        catchError(error => of(commentsActions.createError({ error })))
      ))
  ));

  createError$ = createEffect(() => this.actions$.pipe(
    ofType(commentsActions.createError),
    tap(({ error }) => console.warn(`Не удалось добавить комментарий. Ошибка: ${error.message}`))
  ), { dispatch: false });

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(commentsActions.remove),
    filter(({ id }) => !!id),
    switchMap(({ id }) => this.commentsService.removeComment(id)
      .pipe(
        map(() => commentsActions.remove({ id })),
        catchError(error => of(commentsActions.removeError({ error })))
      ))
  ), { dispatch: false });

  removeError$ = createEffect(() => this.actions$.pipe(
    ofType(commentsActions.removeError),
    tap(({ error }) => console.warn(`Не удалось удалить комментарий. Ошибка: ${error.message}`))
  ), { dispatch: false });

  constructor(
    private readonly actions$: Actions,
    private readonly commentsService: CommentsService
  ) { }
}
