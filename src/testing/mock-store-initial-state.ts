import { IComment, IPost } from '@app/shared/interface';
import * as fromRoot from '@app/store/reducers';


export const commentStoreStub: IComment = { id: '1', text: 'comment', date: new Date(0) };
export const modelStoreStub: IPost = { id: '1', title: 'model', text: 'text', date: new Date(0) };
export const newsStoreStub: IPost = { id: '1', title: 'news', text: 'text', date: new Date(0) };

export const mockStoreInitialState: fromRoot.State = {
  comments: { comments: [commentStoreStub] },
  models: { models: [modelStoreStub], loading: false },
  news: { news: [newsStoreStub], loading: false }
};
