import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IFbCreateResponse, IPost } from './interface';


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

  createModel(post: IPost): Observable<IPost> {
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

  getNewsById(id: string): Observable<IPost> {
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

  removeNews = (id: string): Observable<void> =>
    this.http.delete<void>(`${environment.fbDbUrl}/news/${id}.json`);

  removeModel = (id: string): Observable<void> =>
    this.http.delete<void>(`${environment.fbDbUrl}/models/${id}.json`);

  updateNews = (post: IPost): Observable<IPost> =>
    this.http.put<IPost>(`${environment.fbDbUrl}/news/${post.id}.json`, post);

  updateModel = (post: IPost): Observable<IPost> =>
    this.http.put<IPost>(`${environment.fbDbUrl}/models/${post.id}.json`, post);

}
