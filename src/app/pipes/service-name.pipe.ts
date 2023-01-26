import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serviceName',
})
export class ServiceNamePipe implements PipeTransform {
  transform(value: string) {
    return value.trim().split(' ').slice(1).join(' ');
  }
}
