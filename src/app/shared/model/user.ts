export class User {
    userId?: number
    role: Role
    username: string
    password?: string
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

export class UserEntity {
    userId?: number
    role: Role
    username: string
    password?: string
    email: string
    phone: number
    firstName: string
    lastName: string
    active: boolean
}

export function convert(user: User): UserEntity {
    return {
        userId: user.userId,
        role: user.role,
        username: user.username,
        password: user.password,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        active: user.isActive
    }
}