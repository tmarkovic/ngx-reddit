import { distanceInWordsToNow, parse } from 'date-fns';
import { Preview } from './preview';

export class Post {
  constructor(
    public thumbnail: string,
    public created: number,
    public num_comments: number,
    public author: string,
    public score: number,
    public permalink: string,
    public title: string,
    public selfText: string,
    public preview?: Preview,
  ) {}

  get createdDistance() {
    return distanceInWordsToNow(parse(this.created * 1000));
  }
}
