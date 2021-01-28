import { IncomingMessage, ServerResponse } from 'http'
import nookies from "nookies";
import redirect from './redirect'

const setHeaders = (token: string) => {
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json; charset=utf-8");
  headers.append("Authorization", token);

  return headers
}

export default async function apiFetch<T>(
    req: IncomingMessage, 
    res: ServerResponse,
    apiPath: string,
    method: string = "Get", 
    body?: object): Promise<T | void> {

  const {token} = nookies.get({ req });
  if(!token) {
    redirect(res, '/login')
    return;
  }
  
  const headers = setHeaders(token)
 
  return await fetch(`http://localhost:3000/api/${apiPath}`, {
    headers,
    method,
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(body),
  }).then(response => {
    console.log(response, 'response')
    if (response.status === 200) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
}