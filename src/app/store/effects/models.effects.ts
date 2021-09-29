import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, tap, switchMap, delay, filter } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AlertService } from '@admin/shared/services/alert.service';
import { PostsService } from '@app/shared/posts.service';
import * as modelsActions from '@app/store/actions/models';


@Injectable()
export class ModelsEffects {
  load$ = createEffect(() => this.actions$.pipe(
    ofType(modelsActions.load),
    switchMap(() => this.postsService.getAllModels()
      .pipe(
        map(models => modelsActions.loaded({ models })),
        catchError(() => of(modelsActions.loadError()))
      )
    ))
  );

  loadError$ = createEffect(() => this.actions$.pipe(
    ofType(modelsActions.loadError),
    tap(() => console.warn(`Не удалось загрузить модели автомобилей, повторная загрузка через ${environment.requestRetryDelay} мс.`)),
    delay(environment.requestRetryDelay),
    switchMap(() => of(modelsActions.load()))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(modelsActions.create),
    filter(({ model }) => !!model),
    switchMap(({ model }) => this.postsService.createModel(model)
      .pipe(
        map(() => modelsActions.load()),
        tap(() => this.alertService.success('Модель успешно создана')),
        catchError(error => of(modelsActions.createError({ error })))
      ))
  ));

  createError$ = createEffect(() => this.actions$.pipe(
    ofType(modelsActions.createError),
    tap(({ error }) => this.alertService.danger(`Модель не создана. Ошибка: ${error.message}`))
  ), { dispatch: false });

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(modelsActions.remove),
    filter(({ id }) => !!id),
    switchMap(({ id }) => this.postsService.removeModel(id)
      .pipe(
        map(() => modelsActions.remove({ id })),
        tap(() => this.alertService.success('Модель успешно удалена')),
        catchError(error => of(modelsActions.removeError({ error })))
      ))
  ), { dispatch: false });

  removeError$ = createEffect(() => this.actions$.pipe(
    ofType(modelsActions.removeError),
    tap(({ error }) => this.alertService.danger(`Модель не удалена. Ошибка: ${error.message}`))
  ), { dispatch: false });

  update$ = createEffect(() => this.actions$.pipe(
    ofType(modelsActions.update),
    filter(({ model }) => !!model),
    switchMap(({ model }) => this.postsService.updateModel(model)
      .pipe(
        map(() => modelsActions.load()),
        tap(() => this.alertService.success('Модель успешно изменена')),
        catchError(error => of(modelsActions.updateError({ error })))
      ))
  ));

  updateError$ = createEffect(() => this.actions$.pipe(
    ofType(modelsActions.updateError),
    tap(({ error }) => this.alertService.danger(`Модель не изменена. Ошибка: ${error.message}`))
  ), { dispatch: false });

  constructor(
    private readonly actions$: Actions,
    private readonly alertService: AlertService,
    private readonly postsService: PostsService
  ) { }
}
