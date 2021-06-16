import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let desc = value.split(' ')
    desc.shift()
    desc.shift()
    desc.map((x) => {
      let first = x[0]
      return `${first}${x.substring(1).toLowerCase()}`
    })
    return `${desc.join(' ')}`;
  }

}
