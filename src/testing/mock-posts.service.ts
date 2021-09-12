import { Observable, of } from 'rxjs';

import { IPost } from '@app/shared/interface';


export class MockPostsService {
  createNews = (post: IPost): Observable<IPost> => of(post);

  createModels = (post: IPost): Observable<IPost> => of(post);

  getAllNews = (): Observable<IPost[]> => of([{ id: '1', title: 'title', text: 'text', date: new Date(0) }]);

  getAllModels = (): Observable<IPost[]> => of([{ id: '1', title: 'title', text: 'text', date: new Date(0) }]);

  getNewById = (id: string): Observable<IPost> => of({ id: '1', title: 'title', text: 'text', date: new Date(0) });

  getModelById = (id: string): Observable<IPost> => of({ id: '1', title: 'title', text: 'text', date: new Date(0) });

  removeNew = (id: string): Observable<void> => of();

  removeModel = (id: string): Observable<void> => of();

  updateNew = (post: IPost): Observable<IPost> => of(post);

  updateModel = (post: IPost): Observable<IPost> => of(post);
}
