import { HtmlEntityDecoderPipe } from './html-entity-decoder.pipe';

describe('HtmlEntityDecoderPipe', () => {
  it('create an instance', () => {
    const pipe = new HtmlEntityDecoderPipe();
    expect(pipe).toBeTruthy();
  });
});
