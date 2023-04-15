import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectCode',
})
export class ProjectCodePipe implements PipeTransform {
  transform(value: string) {
    if (!value) return null;

    return value.split(' ').pop();
  }
}
