import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Post } from "./models/post";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { distanceInWordsToNow } from "date-fns";
import { Preview } from "./models/preview";

@Injectable({
  providedIn: "root"
})
export class PostService {
  constructor(private http: HttpClient) {}

  mapParameters = (params): string => {
    return Object.entries(params)
      .map(([param, value], i) => {
        if (value) {
          return `${i === 0 ? "?" : "&"}${param}=${value}`;
        }
      })
      .filter(x => !!x)
      .join("");
  };

  getPosts({
    subreddit,
    limit = 15,
    before,
    after
  }: {
    subreddit: string;
    limit?: number;
    before?: string;
    after?: string;
  }): Observable<{ after: string; before: string; posts: Post[] }> {
    console.log(this.mapParameters({ limit, before, after }));
    return this.http
      .get<Post>(
        `/api/${subreddit}.json${this.mapParameters({ limit, before, after })}`
      )
      .pipe(
        map((res: any) => {
          let posts = res.data.children.map((child: any) => {
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

          return { posts, after: res.data.after, before: res.data.before };
        })
      );
  }
}
