export interface UserToken {
    token: string,
    expireDate?: string,
    userId: string,
    role: string
}

export interface LoginDto {
    email: string,
    password?: string
}

export interface UserDto extends LoginDto {
    
    userId?: string,
    name: string,
    surnames: string,
    phone: string,
    role?: Role;
}

export enum Role {
    USER =  'User',
    BROKER= 'Broker',
    ADMIN = 'Admin',
}