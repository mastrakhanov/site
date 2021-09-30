import { TestBed } from '@angular/core/testing';
import { HttpClient} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { newsStub } from 'src/testing/news-stub';
import { modelStub } from 'src/testing/model-stub';
import { responseStub } from 'src/testing/response-stub';

import { PostsService } from '@app/shared/posts.service';


describe('PostsService', () => {
  let postsService: PostsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

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

  it('should return created news', () => {
    postsService.createNews(newsStub).subscribe(data => expect(data).toEqual({ ...newsStub, id: responseStub.name }));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/news.json`);
    expect(req.request.method).toEqual('POST');

    req.flush(responseStub);
  });

  it('should return created model', () => {
    postsService.createModel(modelStub).subscribe(data => expect(data).toEqual({ ...modelStub, id: responseStub.name }));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/models.json`);
    expect(req.request.method).toEqual('POST');

    req.flush(responseStub);
  });

  it('should return all news', () => {
    postsService.getAllNews().subscribe(data => expect(data).toEqual([newsStub]));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/news.json`);
    expect(req.request.method).toEqual('GET');

    req.flush({ 1: newsStub });
  });

  it('should return all models', () => {
    postsService.getAllModels().subscribe(data => expect(data).toEqual([modelStub]));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/models.json`);
    expect(req.request.method).toEqual('GET');

    req.flush({ 1: modelStub });
  });

  it('should return news by id', () => {
    postsService.getNewsById('1').subscribe(data => expect(data).toEqual(newsStub));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/news/1.json`);
    expect(req.request.method).toEqual('GET');

    req.flush(newsStub);
  });

  it('should return model by id', () => {
    postsService.getModelById('1').subscribe(data => expect(data).toEqual(modelStub));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/models/1.json`);
    expect(req.request.method).toEqual('GET');

    req.flush(modelStub);
  });

  it('should remove news', () => {
    postsService.removeNews('1').subscribe(data => expect(data).toEqual(null));
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

  it('should update news', () => {
    postsService.updateNews(newsStub).subscribe(data => expect(data).toEqual(newsStub));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/news/1.json`);
    expect(req.request.method).toEqual('PUT');

    req.flush(newsStub);
  });

  it('should update model', () => {
    postsService.updateModel(modelStub).subscribe(data => expect(data).toEqual(modelStub));
    const req = httpTestingController.expectOne(`${environment.fbDbUrl}/models/1.json`);
    expect(req.request.method).toEqual('PUT');

    req.flush(modelStub);
  });
});
