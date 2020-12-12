export interface User {
    firstName: string,
    lastName: string,
    email: string
}

export interface UserToken extends User{
    exp: number;
    iat: number;
}