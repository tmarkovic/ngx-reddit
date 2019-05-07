import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../reducers/posts.reducer";
import { FetchPosts } from '../actions/posts.actions';
import { Router } from '@angular/router';

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit {
  public subreddit: string = '';
  constructor(private router: Router) { }

  ngOnInit() { }

  onSearch(e: any) {
    e.preventDefault();
    this.subreddit.length && this.router.navigate([this.subreddit]);

  }

  onKey(e: any) {
    this.subreddit = e.target.value;
  }
}
