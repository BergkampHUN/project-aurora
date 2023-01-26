import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectCode',
})
export class ProjectCodePipe implements PipeTransform {
  transform(value: string) {
    return value.split(' ').pop();
  }
}
