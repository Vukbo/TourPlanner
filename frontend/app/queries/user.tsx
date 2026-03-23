import { QueryClient, useQuery } from "@tanstack/react-query";

interface ClientErrorResponse{
    error: string,
}

interface UserLoginDTO{
    id: string,
    password: string,
}

interface APIUrl{
    protocol: string,
    host: string,
    port: number,
}

interface QueryParameter{
    id: string,
    value: string,
}


export const queryClient = new QueryClient

const ApiBackend : APIUrl = {protocol: "http", host: "localhost", port: 2406}

// const loginQuery = useQuery({queryKey: ['login'], queryFn: Login})

function BuildRequest(baseURL: APIUrl, path: string, method : string, body? : any, queryParams? : QueryParameter[]) : Request {
    let url = `${baseURL.protocol}://${baseURL.host}:${baseURL.port}/${path}`
    let jsonBody = JSON.stringify(body)
    let request = new Request ( url, {method: method} )

    if(body){
        request = new Request ( url, { ...request, body : jsonBody} )
    }

    if(queryParams){
        if(queryParams.length > 0){
            url += "?";
            for(let param of queryParams){
                url += `${param.id}=${param.value}`
                if(queryParams.indexOf(param) < queryParams.length){
                    url += "&"
                } 
            }
        }
    }
    return request
}



export async function Login(user: UserLoginDTO){
    const request = BuildRequest(ApiBackend, "auth/login", "POST", user)
    console.log(request)
    const response = await fetch(
        request
    )

    //client errors reagieren
    if(response.status >= 400 && response.status < 500){
        throw new Error ((await response.json() as ClientErrorResponse).error)
    }

    return await response.json()
}

