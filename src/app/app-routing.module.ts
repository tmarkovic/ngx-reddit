import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostListComponent } from "./post-list/post-list.component";
import { SinglePostComponent } from "./single-post/single-post.component";

const routes: Routes = [
  { path: ":id", component: PostListComponent },
  { path: ":id/comments/:post_id", component: SinglePostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
