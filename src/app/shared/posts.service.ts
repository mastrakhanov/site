import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IFbCreateResponse, IPost } from './interface';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })

export class PostsService {

 constructor(private readonly http: HttpClient) { }

  createNews(post: IPost): Observable<IPost> {
    return this.http.post<IFbCreateResponse>(`${environment.fbDbUrl}/news.json`, post)
      .pipe(map((response: IFbCreateResponse) => ({
        ...post,
        id: response.name,
        date: new Date(post.date)
      })));
  }

  createModels(post: IPost): Observable<IPost> {
    return this.http.post<IFbCreateResponse>(`${environment.fbDbUrl}/models.json`, post)
      .pipe(map((response: IFbCreateResponse) => ({
        ...post,
        id: response.name,
        date: new Date(post.date)
      })));
  }

  getAllNews(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${environment.fbDbUrl}/news.json`)
      .pipe(map((response: {[key: string]: any}) =>
        Object.keys(response).map(key => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        })))
      );
  }

  getAllModels(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${environment.fbDbUrl}/models.json`)
      .pipe(map((response: {[key: string]: any}) =>
        Object.keys(response).map(key => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        })))
      );
  }

  getNewById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${environment.fbDbUrl}/news/${id}.json`)
      .pipe(map((post: IPost) => ({
        ...post,
        id,
        date: new Date(post.date)
      })));
  }

  getModelById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${environment.fbDbUrl}/models/${id}.json`)
      .pipe(map((post: IPost) => ({
        ...post,
        id,
        date: new Date(post.date)
      })));
  }

  removeNew = (id: string): Observable<void> =>
    this.http.delete<void>(`${environment.fbDbUrl}/news/${id}.json`);

  removeModel = (id: string): Observable<void> =>
    this.http.delete<void>(`${environment.fbDbUrl}/models/${id}.json`);

  updateNew = (post: IPost): Observable<IPost> =>
    this.http.patch<IPost>(`${environment.fbDbUrl}/news/${post.id}.json`, post);

  updateModel = (post: IPost): Observable<IPost> =>
    this.http.patch<IPost>(`${environment.fbDbUrl}/models/${post.id}.json`, post);

}
