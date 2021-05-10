export class User {
    userId: number
    role: Role
    username: string
    email: string
    phone: number
    firstName: string
    lastName: string
    isActive: boolean
}

export class Role {
    roleId: number
    name: string
}