import { createAction, props } from '@ngrx/store';

import { IComment } from '@app/shared/interface';


const apiPrefix = '[Comments/API]';

export const load = createAction(`${apiPrefix} Load`);
export const loaded = createAction(`${apiPrefix} Loaded`, props<{ comments: IComment[] }>());
export const loadError = createAction(`${apiPrefix} Load Error`);
export const create = createAction(`${apiPrefix} Create`, props<{ comment: IComment }>());
export const createError = createAction(`${apiPrefix} Create Error`, props<{ error: Error }>());
export const remove = createAction(`${apiPrefix} Remove`, props<{ id: string }>());
export const removeError = createAction(`${apiPrefix} Remove Error`, props<{ error: Error }>());
