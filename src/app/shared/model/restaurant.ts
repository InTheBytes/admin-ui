export class Restaurant {
    restaurantId: number
    name: string
    cuisine: string
    location: Location
}

export class Location {
    locationId: number
    street: string
    unit: string
    city: string
    state: string
    zipCode: number
}