import { Observable, of } from 'rxjs';

import { IComment } from '@app/shared/interface';
import { commentStub } from './comments-stub';


export class MockCommentsService {
  createComment = (comment: IComment): Observable<IComment> => of(comment);

  removeComment = (id: string): Observable<void> => of(null);

  getAllComments = (): Observable<IComment[]> => of([commentStub]);
}
