
import {Injectable, NestMiddleware} from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
@Injectable()
export class NextMiddleware implements NestMiddleware{
   async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    // custom middleware logic
    next()
   }
}