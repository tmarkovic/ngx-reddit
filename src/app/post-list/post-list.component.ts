import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { Observable } from "rxjs";
import { Post } from "../models/post";
import { Store, select } from "@ngrx/store";
import { State } from "../reducers/index";
import { SetPostLimit, FetchPosts } from "../actions/posts.actions";
import { State as PostsState } from "../reducers/posts.reducer";
import { map } from "rxjs/operators";
import { Router, Params } from "@angular/router";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit {
  public posts$: Observable<State> = this.store.select("posts");
  after: string;
  before: string;
  count: number;

  constructor(
    private postService: PostService,
    private store: Store<{ State }>,
    private router: Router
  ) { }

  setPostLimit(n: number, e: any) {
    e.preventDefault();
    this.router.navigate([], {
      queryParams: {
        limit: n
      }
    });
  }
  next(e: any) {
    e.preventDefault();
    this.router.navigate([], {
      queryParams: {
        after: this.after,
        before: null,
        count: this.count
      },
      queryParamsHandling: "merge"
    });
  }

  prev(e: any) {
    e.preventDefault();
    this.router.navigate([], {
      queryParams: {
        before: this.before,
        after: null,
        count: this.count
      },
      queryParamsHandling: "merge"
    });
  }
  ngOnInit() {
    this.store.select("posts").subscribe(x => { this.after = x.after; this.before = x.before, this.count = x.count })
  }
}
