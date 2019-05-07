import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../reducers/posts.reducer";
import { FetchPosts } from '../actions/posts.actions';

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit {
  public subreddit: string = '';
  constructor(private store: Store<State>) {}

  ngOnInit() {}

  onSearch(e: any) {
    e.preventDefault();
    this.subreddit.length && this.store.dispatch(new FetchPosts({ subreddit: this.subreddit}));

  }

  onKey(e: any) {
    this.subreddit = e.target.value;
  }
}
