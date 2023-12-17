import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoursAndMinutes',
  standalone: true,
})
export class HoursAndMinutesPipe implements PipeTransform {
  transform(mins: number): unknown {
    let h: string | number = Math.floor(mins / 60);
    let m: string | number = mins % 60;
    h = h < 10 ? '0' + h : h.toString();
    m = m < 10 ? '0' + m : m.toString();
    return `${h}:${m}`;
  }
}
