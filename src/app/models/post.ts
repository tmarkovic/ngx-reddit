export class Post {
  constructor(
    public thumbnail: string,
    public created: string,
    public num_comments: number,
    public author: string,
    public score: number,
    public permalink: string,
    public title: string
  ) {}
}
