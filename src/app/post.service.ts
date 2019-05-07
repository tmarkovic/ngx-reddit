import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Post } from "./models/post";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { distanceInWordsToNow } from "date-fns";
import { Preview } from './models/preview';

@Injectable({
  providedIn: "root"
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts({
    subreddit,
    postLimit = 5,
    after = "t3_blad89"
  }: {
    subreddit: string;
    postLimit?: number;
    after?: string;
  }): Observable<Post[]> {
    return this.http
      .get<Post>(`/api/${subreddit}.json?limit=${postLimit}&count=${postLimit}`)
      .pipe(
        map((data: any) => {
          console.log(data);
          return data.data.children.map((child: any) => {
            const {
              thumbnail,
              created,
              num_comments,
              author,
              score,
              permalink,
              title,
              preview,
              selftext
            } = child.data;

            return new Post(
              thumbnail,
              created,
              num_comments,
              author,
              score,
              permalink,
              title,
              selftext,
              preview ? new Preview(preview.enabled, preview.images) : null
            );
          });
        })
      );
  }
}
