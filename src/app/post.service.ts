import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Post} from './models/post';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(subreddit: string) : Observable<Post[]> {
    return this.http.get<Post>(`/api/${subreddit}.json`).pipe(map((data: any) => {
      console.log(data)
      return data.data.children.map((child: any) => {
        const {thumbnail,
          created,
          num_comments,
          author,
          score,
          permalink,
          title} = child.data;

          return new Post(thumbnail,created,num_comments,author,score,permalink,title);
      });
    }));
  }
}
