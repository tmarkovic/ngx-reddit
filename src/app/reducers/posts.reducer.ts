import { Action } from "@ngrx/store";
import { ActionTypes, ActionsUnion } from "../actions/posts.actions";
import { Post } from '../models/post';

export interface State {
  postLimit: number;
  lastPostId: string;
  posts: Array<Post>,
  isLoading: boolean,
  subreddit: string
}

export const initialState: State = {
  postLimit: 10,
  lastPostId: "",
  posts: new Array<Post>(),
  isLoading: false,
  subreddit: ''
};

export function postsReducer(state = initialState, action: ActionsUnion) {
  switch (action.type) {
    case ActionTypes.SetSubreddit: {
      return {
        ...state,
        ...action.payload
      };
    }
    case ActionTypes.SetLimit: {
      return {
        ...state,
        ...action.payload
      };
    }
    case ActionTypes.SetLastPostId: {
      return {
        ...state,
        ...action.payload
      };
    }
    case ActionTypes.SetPosts: {
      return {
        ...state,
        isLoading: false,
        ...action.payload
      };
    }
    case ActionTypes.FetchPosts: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default:
      return state;
  }
}
