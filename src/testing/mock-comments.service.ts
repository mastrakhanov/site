import { Observable, of } from 'rxjs';

import { IComment } from '@app/shared/interface';


export class MockCommentsService {
  createComment = (comment: IComment): Observable<IComment> => of(comment);

  deleteComment = (id: string): Observable<void> => of();

  getAllComments = (): Observable<IComment[]> => of([{ id: '1', text: 'text', date: new Date(0) }]);
}
