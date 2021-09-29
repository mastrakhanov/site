import { createAction, props } from '@ngrx/store';

import { IPost } from '@app/shared/interface';


const apiPrefix = '[News/API]';

export const load = createAction(`${apiPrefix} Load`);
export const loaded = createAction(`${apiPrefix} Loaded`, props<{ news: IPost[] }>());
export const loadError = createAction(`${apiPrefix} Load Error`);
export const create = createAction(`${apiPrefix} Create`, props<{ news: IPost }>());
export const createError = createAction(`${apiPrefix} Create Error`, props<{ error: Error }>());
export const remove = createAction(`${apiPrefix} Remove`, props<{ id: string }>());
export const removeError = createAction(`${apiPrefix} Remove Error`, props<{ error: Error }>());
export const update = createAction(`${apiPrefix} Update`, props<{ news: IPost }>());
export const updateError = createAction(`${apiPrefix} Update Error`, props<{ error: Error }>());
