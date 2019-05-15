import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PostListComponent } from "./post-list/post-list.component";
import { FormatNumberPipe } from "./format-number.pipe";
import { StoreModule } from "@ngrx/store";
import { postsReducer } from "./reducers/posts.reducer";
import { SearchBarComponent } from './search-bar/search-bar.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './post.effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { HtmlEntityDecoderPipe } from './html-entity-decoder.pipe';
import { SinglePostComponent } from './single-post/single-post.component';

@NgModule({
  declarations: [AppComponent, PostListComponent, FormatNumberPipe, SearchBarComponent, HtmlEntityDecoderPipe, SinglePostComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ posts: postsReducer, router: routerReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([PostEffects]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
