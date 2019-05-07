import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { EMPTY, of, concat, merge } from "rxjs";
import {
  map,
  mergeMap,
  catchError,
  switchMap,
  withLatestFrom,
  filter,
  tap,
} from "rxjs/operators";

import { PostService } from "./post.service";
import {
  ActionsUnion,
  ActionTypes,
  SetLastPostId,
  SetPostLimit,
  FetchPosts,
  SetPosts,
  SetSubreddit
} from "./actions/posts.actions";
import { Store, select } from "@ngrx/store";
import { RouterNavigationAction, ROUTER_REQUEST } from "@ngrx/router-store";

import { Post } from "./models/post";
import { State } from './reducers/posts.reducer';
import { RouterState } from '@angular/router';

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
    mergeMap(action =>
      [
        this.postService
          .getPosts({ subreddit: action.payload.subreddit })
          .pipe(map((posts: Post[]) => new SetPosts({ posts: posts }))),
        new SetSubreddit({ subreddit: action.payload.subreddit })
      ]
    )
  );

  @Effect()
  loadPostsWithLimit = this.actions$.pipe(
    ofType<SetPostLimit>(ActionTypes.SetLimit),
    withLatestFrom(this.store),
    switchMap(([action, state]) => {
      console.log(state)
      return this.postService
        .getPosts({ subreddit: state.posts.subreddit, postLimit: action.payload.limit })
        .pipe(map((posts: Post[]) => new SetPosts({ posts: posts })))
    }
    )
  );
  @Effect()
  fetchPostsOnNavigate = this.actions$.pipe(
    ofType<RouterNavigationAction>(ROUTER_REQUEST),
    switchMap(action => {
      return action.payload.event.url.length > 1 ?
        this.postService
          .getPosts({ subreddit: action.payload.event.url.split('/')[1] })
          .pipe(switchMap((posts: Post[]) => [
            new SetPosts({ posts: posts }),
            new SetSubreddit({ subreddit: action.payload.event.url.split('/')[1] })]))
        : EMPTY
    })
  );

  constructor(
    private actions$: Actions,
    private postService: PostService,
    private store: Store<{ posts: State, router: RouterState }>
  ) { }
}
