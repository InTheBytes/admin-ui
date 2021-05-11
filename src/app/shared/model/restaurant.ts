export class Restaurant {
    restaurantId: number
    name: string
    cuisine: string
    location: Location
    foods: Array<Food>
}

export class Location {
    locationId: number
    street: string
    unit: string
    city: string
    state: string
    zipCode: number
}

export class Food {
    foodId: number
    name: string
    price: number
    description: string
}