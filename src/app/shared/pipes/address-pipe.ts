import { Pipe, PipeTransform } from "@angular/core";
import { Location } from "../model/restaurant";

@Pipe({
    name: 'address'
})
export class AddressPipe implements PipeTransform {
    transform(loc: Location): string {
        return `${loc.unit} ${loc.street},
        ${loc.city}, ${loc.state} ${loc.zipCode}`
    }
}