import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '@src/environments/environment';
import { IComment, IFbCreateResponse } from './interface';


@Injectable({ providedIn: 'root' })

export class CommentsService {

  constructor(private readonly http: HttpClient) { }

  createComment(comment: IComment): Observable<IComment> {
    return this.http.post(`${environment.fbDbUrl}/comments/news.json`, comment)
      .pipe(map((response: IFbCreateResponse) => ({
        ...comment,
        id: response.name,
        date: new Date(comment.date)
      })));
  }

  deleteComment = (id: string): Observable<void> =>
    this.http.delete<void>(`${environment.fbDbUrl}/comments/news/${id}.json`);

  getAllComments(): Observable<IComment[]> {
    return this.http.get(`${environment.fbDbUrl}/comments/news.json`)
      .pipe(
        filter(x => !!x),
        map((response: {[key: string]: any}) =>
          Object.keys(response).map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          })))
      );
  }

}
