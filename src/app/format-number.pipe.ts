import { Pipe, PipeTransform } from '@angular/core';
import {formatNumberSuffix} from './common';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform(value: any, args?: any): string {
    return formatNumberSuffix(value);
  }

}
