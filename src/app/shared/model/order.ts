import { Time } from "@angular/common"
import { Location, Restaurant } from "./restaurant"
import { User } from "./user"

export class Order {
    id?: string
    status?: string | number
    destinationId?: string
    destination?: Location
    windowStart?: Date | string
    windowEnd?: Date | string
    specialInstructions?: string
    customer?: User
    customerId?: string
    driver?: User
    restaurant?: Restaurant
    restaurantId?: string
    items: LineItem[]
}

export class LineItem {
    food: string
    quantity: number
    name?: string
    price?: number
}