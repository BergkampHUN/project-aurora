import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companyName',
})
export class CompanyNamePipe implements PipeTransform {
  transform(value: string) {
    return value.split(' ')[0];
  }
}
