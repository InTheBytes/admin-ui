import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let desc = value.split(' ')[2]
    return `${desc[0]}${desc.substring(1).toLowerCase()}`;
  }

}
