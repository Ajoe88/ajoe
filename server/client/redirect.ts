import { ServerResponse } from 'http'

const redirect = (res: ServerResponse, path: string) => {
  res.writeHead(302, { Location: path })
  res.end()
}

export default redirect
