import { Pipe, PipeTransform } from '@angular/core';
import { Location } from '../shared/model/restaurant';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(value: Location, ...args: unknown[]): string {
    return `${value.unit} ${value.street},
    ${value.city}, ${value.state} ${value.zipCode}`.replace(/\n/g, '<br>');
  }

}
