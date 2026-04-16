import type { TourLog } from "./logs";

export enum TransportTypes {
    Hiking=0,
    Biking=1
}

export interface Tour {
    id?: string,
    author: string,
    title : string,
    description? : string,
    from : string,
    to : string,
    transportType: TransportTypes,
    distance?: number,
    duration?: number,
    logs? : TourLog[]
}