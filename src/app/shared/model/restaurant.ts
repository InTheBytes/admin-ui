import { User } from "./user"

export class Restaurant {
    restaurantId: number
    name: string
    cuisine: string
    location: Location
    managers: User[]
}

export class Location {
    locationId: number
    street: string
    unit: string
    city: string
    state: string
    zipCode: number
}