import { Pipe, PipeTransform } from '@angular/core';
import { decodeHtmlEntities } from './common';

@Pipe({
  name: 'htmlEntityDecoder'
})
export class HtmlEntityDecoderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return decodeHtmlEntities(value);
  }

}
