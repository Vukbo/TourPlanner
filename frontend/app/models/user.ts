export interface UserModel{
    id: string,
    username : string,
    password : string,
    tours? : string[],
}

export interface RegisterModel{
    username : string,
    password : string,
}