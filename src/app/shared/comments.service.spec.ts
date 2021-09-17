import { TestBed } from '@angular/core/testing';
import { HttpClient} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { IComment, IFbCreateResponse } from '@app/shared/interface';
import { CommentsService } from '@app/shared/comments.service';


describe('CommentsService', () => {
  let commentsService: CommentsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const commentStub: IComment = { text: 'text', date: new Date(0) };
  const responseStub: IFbCreateResponse = { name: '1' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();

    commentsService = TestBed.inject(CommentsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(commentsService).toBeTruthy();
  });

  it('should return created comment', () => {
    commentsService.createComment(commentStub).subscribe(data => expect(data).toEqual({ ...commentStub, id: responseStub.name }));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/comments/news.json`);
    expect(req.request.method).toEqual('POST');

    req.flush(responseStub);
  });

  it('should delete comment', () => {
    commentsService.removeComment('1').subscribe(data => expect(data).toEqual(null));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/comments/news/1.json`);
    expect(req.request.method).toEqual('DELETE');

    req.flush(null);
  });

  it('should return all comments', () => {
    commentsService.getAllComments().subscribe(data => expect(data).toEqual([{ ...commentStub, id: '1' }]));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/comments/news.json`);
    expect(req.request.method).toEqual('GET');

    req.flush({ '1': commentStub });
  });
});
