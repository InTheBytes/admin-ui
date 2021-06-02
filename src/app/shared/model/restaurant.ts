import { User } from "./user"

export class Restaurant {
    restaurantId: string
    name: string
    cuisine: string
    location: Location
    managers: User[]
}

export class Location {
    locationId: string
    street: string
    unit: string
    city: string
    state: string
    zipCode: number
}