import { TestBed } from '@angular/core/testing';
import { HttpClient} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { IFbCreateResponse, IPost } from '@app/shared/interface';
import { PostsService } from '@app/shared/posts.service';


describe('PostsService', () => {
  let postsService: PostsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const postsStub: IPost = { title: 'title', text: 'text', date: new Date(0) };
  const responseStub: IFbCreateResponse = { name: '1' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();

    postsService = TestBed.inject(PostsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(postsService).toBeTruthy();
  });

  it('should return created new', () => {
    postsService.createNew(postsStub).subscribe(data => expect(data).toEqual({ ...postsStub, id: responseStub.name }));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/news.json`);
    expect(req.request.method).toEqual('POST');

    req.flush(responseStub);
  });

  it('should return created model', () => {
    postsService.createModel(postsStub).subscribe(data => expect(data).toEqual({ ...postsStub, id: responseStub.name }));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/models.json`);
    expect(req.request.method).toEqual('POST');

    req.flush(responseStub);
  });

  it('should return all news', () => {
    postsService.getAllNews().subscribe(data => expect(data).toEqual([{ ...postsStub, id: '1' }]));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/news.json`);
    expect(req.request.method).toEqual('GET');

    req.flush({ 1: postsStub });
  });

  it('should return all models', () => {
    postsService.getAllModels().subscribe(data => expect(data).toEqual([{ ...postsStub, id: '1' }]));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/models.json`);
    expect(req.request.method).toEqual('GET');

    req.flush({ 1: postsStub });
  });

  it('should return new by id', () => {
    postsService.getNewById('1').subscribe(data => expect(data).toEqual({ ...postsStub, id: '1' }));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/news/1.json`);
    expect(req.request.method).toEqual('GET');

    req.flush(postsStub);
  });

  it('should return model by id', () => {
    postsService.getModelById('1').subscribe(data => expect(data).toEqual({ ...postsStub, id: '1' }));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/models/1.json`);
    expect(req.request.method).toEqual('GET');

    req.flush(postsStub);
  });

  it('should remove new', () => {
    postsService.removeNew('1').subscribe(data => expect(data).toEqual(null));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/news/1.json`);
    expect(req.request.method).toEqual('DELETE');

    req.flush(null);
  });

  it('should remove model', () => {
    postsService.removeModel('1').subscribe(data => expect(data).toEqual(null));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/models/1.json`);
    expect(req.request.method).toEqual('DELETE');

    req.flush(null);
  });

  it('should update new', () => {
    postsService.updateNew({ ...postsStub, id: '1' }).subscribe(data => expect(data).toEqual(postsStub));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/news/1.json`);
    expect(req.request.method).toEqual('PUT');

    req.flush(postsStub);
  });

  it('should update model', () => {
    postsService.updateModel({ ...postsStub, id: '1' }).subscribe(data => expect(data).toEqual(postsStub));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/models/1.json`);
    expect(req.request.method).toEqual('PUT');

    req.flush(postsStub);
  });
});
