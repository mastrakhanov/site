import { IPost } from '@app/shared/interface';
import { SearchPipe } from './search.pipe';


describe('SearchPipe', () => {
  let searchPipe: SearchPipe;

  beforeEach(() => {
    searchPipe = new SearchPipe();
  });

  it('should create', () => {
    expect(searchPipe).toBeTruthy();
  });

  it('should return filtered postsStub', () => {
    const postsStub: IPost[] = [
      { title: 'title 1', text: 'text 1', date: new Date(0) },
      { title: 'title 2', text: 'text 2', date: new Date(0) }
    ];

    expect(searchPipe.transform(postsStub, '1')).toEqual([postsStub[0]]);
    expect(searchPipe.transform(postsStub, '2')).toEqual([postsStub[1]]);
  });
});
