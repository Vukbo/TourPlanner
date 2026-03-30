import axios from "axios";

const baseURL = "http://localhost:2406";


export const handler = axios.create(
    {
        baseURL: baseURL
    }
);