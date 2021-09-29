import { Observable, of } from 'rxjs';

import { IPost } from '@app/shared/interface';
import { modelStub } from './model-stub';
import { newsStub } from './news-stub';


export class MockPostsService {
  createNews = (post: IPost): Observable<IPost> => of(post);

  createModel = (post: IPost): Observable<IPost> => of(post);

  getAllNews = (): Observable<IPost[]> => of([newsStub]);

  getAllModels = (): Observable<IPost[]> => of([modelStub]);

  getNewsById = (id: string): Observable<IPost> => of(newsStub);

  getModelById = (id: string): Observable<IPost> => of(modelStub);

  removeNews = (id: string): Observable<void> => of(null);

  removeModel = (id: string): Observable<void> => of(null);

  updateNews = (post: IPost): Observable<IPost> => of(post);

  updateModel = (post: IPost): Observable<IPost> => of(post);
}
