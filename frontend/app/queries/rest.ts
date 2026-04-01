import axios from "axios";

const tourServiceURL = "http://localhost:2406";


const routeServiceURL = "https://api.openrouteservice.org/v2/"
// DEV ONLY -> needs to be moved! 
const routeServiceAPIKey = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImFkNDg2YWRkY2E3MjRiZGU4NTE5MmE5MmUxYjk3ZTRlIiwiaCI6Im11cm11cjY0In0="

export const TourService = axios.create(
    {
        baseURL: tourServiceURL,
    }
);

export const RouteService = axios.create(
    {
        baseURL: routeServiceURL,
        params: {
            "api_key" : routeServiceAPIKey
        }
    }
)