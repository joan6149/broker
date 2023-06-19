export interface UserToken {
    token: string,
    expireDate?: string,
    userId: string,
    role: string
}

export interface UserDto {
    
    userId?: string,
    email: string,
    name: string,
    surnames: string,
    phone: string,
    password: string,
    role?: Role;
}

export enum Role {
    USER =  'user',
    BROKER= 'broker',
    ADMIN = 'admin',
}