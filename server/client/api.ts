import { IncomingMessage, ServerResponse } from 'http'
import { parseCookies } from 'nookies'
import redirect from './redirect'

const setHeaders = (token: string): Headers => {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json; charset=utf-8')
  headers.append('Authorization', token)

  return headers
}

/**
 * universal api for both server side render and client
 * @param apiPath api modlue name or path
 * @param req use for server side render
 * @param res use for server side render
 * @param method Get/Post/...
 * @param body request parameters
 */
export default async function apiFetch<T>(
  apiPath: string,
  req?: IncomingMessage,
  res?: ServerResponse,
  method = 'Get',
  body?: Partial<T>
): Promise<T | void> {
  const { token } = parseCookies({ req })
  if (!token && res) {
    redirect(res, '/login')
    return
  }

  const headers = setHeaders(token)

  return await fetch(`http://localhost:3000/api/${apiPath}`, {
    headers,
    method,
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(body),
  }).then((response) => {
    return response.json()
  })
}
