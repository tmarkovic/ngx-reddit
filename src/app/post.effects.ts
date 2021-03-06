import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, mergeMap, switchMap } from "rxjs/operators";

import { PostService } from "./post.service";
import {
  ActionTypes,
  SetPostLimit,
  FetchPosts,
  SetPosts,
  SetSubreddit
} from "./actions/posts.actions";
import { Store } from "@ngrx/store";
import { RouterNavigationAction, ROUTER_NAVIGATION } from "@ngrx/router-store";

import { State } from "./reducers/posts.reducer";
import { RouterState } from "@angular/router";

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
    mergeMap(action => [
      this.postService
        .getPosts({ subreddit: action.payload.subreddit })
        .pipe(map(res => new SetPosts({ ...res }))),
      new SetSubreddit({ subreddit: action.payload.subreddit })
    ])
  );

  // @Effect()
  // loadPostsWithLimit = this.actions$.pipe(
  //   ofType<SetPostLimit>(ActionTypes.SetLimit),
  //   withLatestFrom(this.store),
  //   switchMap(([action, state]) => {
  //     console.log(state);
  //     return this.postService
  //       .getPosts({
  //         subreddit: state.posts.subreddit,
  //         limit: action.payload.limit
  //       })
  //       .pipe(map(res => new SetPosts({ ...res })));
  //   })
  // );
  @Effect()
  fetchPostsOnNavigate = this.actions$.pipe(
    ofType<RouterNavigationAction>(ROUTER_NAVIGATION),
    switchMap(action => {
      let routerRoot = { ...action.payload.routerState.root };
      return action.payload.event.url.length > 1
        ? this.postService
          .getPosts({
            subreddit: routerRoot.firstChild.params.id,
            ...routerRoot.queryParams
          })
          .pipe(
            switchMap(res => {
              let actions = [
                new SetPosts({ ...res }),
                new SetSubreddit({
                  subreddit: routerRoot.firstChild.params.id
                }),
                new SetPostLimit({ limit: routerRoot.queryParams.limit })
              ];
              return actions;
            })
          )
        : EMPTY;
    })
  );

  constructor(
    private actions$: Actions,
    private postService: PostService,
    private store: Store<{ posts: State; router: RouterState }>
  ) { }
}
