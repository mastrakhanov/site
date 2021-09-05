import { Pipe, PipeTransform } from '@angular/core';

import { IPost } from '../../shared/interface';


@Pipe({ name: 'searchInfo' })
export class SearchPipe implements PipeTransform {

  transform(posts: IPost[], search = ''): IPost[] {
    if (!search.trim()) {
      return posts;
    }
    return posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));
  }

}
