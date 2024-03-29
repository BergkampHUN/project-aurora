import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectName',
})
export class ProjectNameSelectedPipe implements PipeTransform {
  transform(value: string) {
    if (!value) return null;

    return value
      .substring(value.indexOf('/') + 1)
      .split(' ')
      .slice(0, -1)
      .join(' ');
  }
}
