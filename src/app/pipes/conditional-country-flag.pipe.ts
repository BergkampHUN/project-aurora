import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conditionalCountryFlag',
})
export class ConditionalFlagPipe implements PipeTransform {
  transform(value: any) {
    let country = '';
    switch (value.trim().split(' ')[0]) {
      case 'VIE':
        country = 'austria';
        break;
      case 'PRN':
        country = 'kosovo';
        break;
      case 'HRV':
        country = 'croatia';
        break;
    }
    return country;
  }
}
