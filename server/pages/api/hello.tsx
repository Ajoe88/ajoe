import { Request, Response } from 'express'

//no auth
export default (req: Request, res: Response) => {
  res.status(200).json({ text: 'Hello' })
}
