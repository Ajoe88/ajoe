import { IncomingMessage, ServerResponse } from 'http'
import nookies from "nookies";
import redirect from './redirect'

const setHeaders = (token: string): Headers => {
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
    method = "Get", 
    body?: Partial<T>): Promise<T | void> {

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
  })
    .then(response => {
      console.log(response, 'response')
      return response.json()
    });
}