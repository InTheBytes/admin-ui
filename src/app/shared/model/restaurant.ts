import { User } from "./user"

export class Restaurant {
    restaurantId?: string
    id?: string
    name?: string
    cuisine?: string
    location?: Location
    foods?: Array<Food>
    managers?: User[]
}

export class Location {
    locationId?: string
    street: string
    unit: string
    city: string
    state: string
    zipCode: number
}

export class Food {
    foodId: string
    name: string
    price: number
    description: string
}