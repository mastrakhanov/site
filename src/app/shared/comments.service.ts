import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Comment, FbCreateResponse} from './interface';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})

export class CommentsService {
  constructor(private http: HttpClient) {}

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post(`${environment.fbDbUrl}/comments/news.json`, comment)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...comment,
          id: response.name,
          date: new Date(comment.date)
        };
      }));
  }

  deleteComment(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/comments/news/${id}.json`);
  }

  getAllComments(): Observable<Comment[]> {
    return this.http.get(`${environment.fbDbUrl}/comments/news.json`)
      .pipe(map((response: {[key: string]: any}) => {
        if (response) {
          return Object.keys(response).map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }));
        }
      }));
 }
}
