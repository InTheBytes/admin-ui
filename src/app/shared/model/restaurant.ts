export class Restaurant {
    restaurantId: number
    name: string
    cuisine: string
    location: Location
}

export class Location {
    locationId: number
    unit: string
    street: string
    city: string
    state: string
    zipCode: number
}