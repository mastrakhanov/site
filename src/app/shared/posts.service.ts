import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbCreateResponse, Post} from './interface';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class PostsService {

 constructor(private http: HttpClient) {}

createNews(post: Post): Observable<Post> {
  return this.http.post(`${environment.fbDbUrl}/news.json`, post)
    .pipe(map((response: FbCreateResponse) => {
      return {
        ...post,
        id: response.name,
        date: new Date(post.date)
      };
    }));
}

createModels(post: Post): Observable<Post> {
  return this.http.post(`${environment.fbDbUrl}/models.json`, post)
    .pipe(map((response: FbCreateResponse) => {
      return {
        ...post,
        id: response.name,
        date: new Date(post.date)
      };
    }));
}

getAllNews(): Observable<Post[]> {
  return this.http.get(`${environment.fbDbUrl}/news.json`)
    .pipe(map((response: {[key: string]: any}) => {
      return Object.keys(response).map(key => ({
        ...response[key],
        id: key,
        date: new Date(response[key].date)
      }));
    }));
}

getAllModels(): Observable<Post[]> {
  return this.http.get(`${environment.fbDbUrl}/models.json`)
    .pipe(map((response: {[key: string]: any}) => {
      return Object.keys(response).map(key => ({
        ...response[key],
        id: key,
        date: new Date(response[key].date)
      }));
    }));
}

getByIdNew(id: string): Observable<Post> {
  return this.http.get<Post>(`${environment.fbDbUrl}/news/${id}.json`)
    .pipe(map((post: Post) => {
      return {
        ...post,
        id,
        date: new Date(post.date)
      };
    }));
}

getByIdModel(id: string): Observable<Post> {
  return this.http.get<Post>(`${environment.fbDbUrl}/models/${id}.json`)
    .pipe(map((post: Post) => {
      return {
        ...post,
        id,
        date: new Date(post.date)
      };
    }));
}

removeNew(id: string): Observable<void> {
  return this.http.delete<void>(`${environment.fbDbUrl}/news/${id}.json`);
}

removeModel(id: string): Observable<void> {
  return this.http.delete<void>(`${environment.fbDbUrl}/models/${id}.json`);
}

updateNew(post: Post): Observable<Post> {
  return this.http.patch<Post>(`${environment.fbDbUrl}/news/${post.id}.json`, post);
}

updateModel(post: Post): Observable<Post> {
  return this.http.patch<Post>(`${environment.fbDbUrl}/models/${post.id}.json`, post);
}

}
