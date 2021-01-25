
import {Injectable, NestMiddleware} from '@nestjs/common'
import { Request, Response } from 'express'
@Injectable()
export class NextMiddleware implements NestMiddleware{
   constructor(){}
   async use(req: Request, res: Response, next: Function){
    // custom middleware logic
    next()
   }
}