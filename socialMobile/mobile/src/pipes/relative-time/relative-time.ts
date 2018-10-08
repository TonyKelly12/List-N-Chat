import { Pipe, PipeTransform } from '@angular/core';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

@Pipe({
  name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {
  /**
   * Returns relative time.
   */
  transform(value: string, ...args):string {
    return distanceInWordsToNow(new Date(value), { addSuffix: true });
  }
}
