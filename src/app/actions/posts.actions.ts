import { Action } from "@ngrx/store";
import { Post } from '../models/post';

export enum ActionTypes {
  SetLimit = "[PostLimit Component] SetLimit",
  SetLastPostId = "[PostLimit Component] SetLastPostId",
  SetPosts = "[PostLimit Component] SetPosts",
  FetchPosts = "[PostLimit Component] FetchPosts",
  SetSubreddit = "SetSubreddit"
}

export class SetSubreddit implements Action {
  readonly type = ActionTypes.SetSubreddit;
  constructor(public payload: { subreddit: string }) { }
}

export class SetPostLimit implements Action {
  readonly type = ActionTypes.SetLimit;
  constructor(public payload: { limit: number }) { }
}

export class SetLastPostId implements Action {
  readonly type = ActionTypes.SetLastPostId;
  constructor(public payload: { lastPostId: string }) { }
}

export class SetPosts implements Action {
  readonly type = ActionTypes.SetPosts;
  constructor(public payload: { posts: Array<Post>, after?: string, before?: string }) { }
}

export class FetchPosts implements Action {
  readonly type = ActionTypes.FetchPosts;
  constructor(public payload: { subreddit: string }) { }

}


export type ActionsUnion = SetPostLimit | SetLastPostId | SetPosts | FetchPosts | SetSubreddit;