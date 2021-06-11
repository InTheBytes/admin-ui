import { Time } from "@angular/common"
import { Location, Restaurant } from "./restaurant"
import { User } from "./user"

export class Order {
    id?: string
    status?: string | number
    destinationId?: string
    distination?: string | Location
    windowStart?: Time
    windowEnd?: Time
    specialInstructions?: string
    customer?: User
    customerId?: string
    driver?: User
    restaurant?: Restaurant
    items: LineItem[]
}

export class LineItem {
    food: string
    quantity: number
    name?: string
    price?: number
}