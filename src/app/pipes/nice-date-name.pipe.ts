import { Pipe, PipeTransform } from '@angular/core';
import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';

@Pipe({
  name: 'niceDateName',
  standalone: true,
})
export class NiceDateNamePipe implements PipeTransform {
  transform(date: Date): string {
    if (isToday(date)) {
      return 'Today';
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('sv');
    }
  }
}
