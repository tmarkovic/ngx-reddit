import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import {
  map,
  mergeMap,
  catchError,
  switchMap,
  withLatestFrom
} from "rxjs/operators";
import { PostService } from "./post.service";
import {
  ActionsUnion,
  ActionTypes,
  SetLastPostId,
  SetPostLimit,
  FetchPosts,
  SetPosts
} from "./actions/posts.actions";
import { Store, select } from "@ngrx/store";
import { RouterNavigationAction, ROUTER_REQUEST } from "@ngrx/router-store";

import { Post } from "./models/post";

@Injectable()
export class PostEffects {
  @Effect()
  // loadMovies$ = this.actions$.pipe(
  //   ofType<SetPostLimit>(ActionTypes.SetLimit),
  //   map(action => action.payload),
  //   withLatestFrom(this.store.pipe(select("posts"))),
  //   map(
  //     ([payload, posts]: [
  //       { limit: number },
  //       { postLimit: number; subreddit: string }
  //     ]) => console.log(payload)
  //   )
  // );
  loadPosts = this.actions$.pipe(
    ofType<FetchPosts>(ActionTypes.FetchPosts),
    switchMap(action =>
      this.postService
        .getPosts({ subreddit: action.payload.subreddit })
        .pipe(map((posts: Post[]) => new SetPosts({ posts: posts })))
    )
  );
  @Effect()
  loadPostsNavigation = this.actions$.pipe(
    ofType<RouterNavigationAction>(ROUTER_REQUEST),
    switchMap(action =>
      this.postService
        .getPosts({ subreddit: action.payload.event.url })
        .pipe(map((posts: Post[]) => new SetPosts({ posts: posts })))
    )
  );

  constructor(
    private actions$: Actions,
    private postService: PostService,
    private store: Store<{ postLimit: number; subreddit: string }>
  ) {}
}
