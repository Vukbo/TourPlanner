import type { Tour } from "./tour";

export interface User{
    id?: string,
    username : string,
    password : string,
    tours? : Tour[]
}
