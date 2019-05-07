import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { Observable } from "rxjs";
import { Post } from "../models/post";
import { Store, select } from "@ngrx/store";
import { State } from "../reducers/index";
import { SetPostLimit, FetchPosts } from "../actions/posts.actions";
import { State as PostsState } from "../reducers/posts.reducer";
import { map } from "rxjs/operators";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit {
  public posts$: Observable<State> = this.store.select("posts");
  constructor(
    private postService: PostService,
    private store: Store<{ State }>
  ) {}

  setPostLimit(n: number, e: any) {
    e.preventDefault();
    this.store.dispatch(new SetPostLimit({limit: n}));
  }

  ngOnInit() {
    this.store.dispatch(new FetchPosts({ subreddit: "sweden" }));
  }
}
