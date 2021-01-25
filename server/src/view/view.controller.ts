import { Controller, Get, Res, Req, Next } from '@nestjs/common'
import { Request, Response } from 'express'

import { ViewService } from './view.service'

@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get('*')
  static(@Req() req: Request, @Res() res: Response, @Next() next: Function) {
    const handle = this.viewService.getNextServer().getRequestHandler()
    if(req.path.startsWith('/admin') || req.path.startsWith('/graphql') || req.path.startsWith('/swagger')) {
      next()
      return
    }

    handle(req, res)
   
  }
}