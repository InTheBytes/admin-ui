export class User {
    userId?: string
    id?: string
    role?: Role
    username?: string
    password?: string
    email?: string
    phone?: number
    name?: string
    firstName?: string
    lastName?: string
    isActive?: boolean
}

export class Role {
    roleId?: string
    name?: string
}

export class UserEntity {
    userId?: string
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