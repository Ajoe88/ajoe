import { Controller, Get, Res, Req, Next } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

import { ViewService } from './view.service'
import routes from '../routers'
@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get('*')
  static(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction
  ): void {
    const handle = this.viewService.getNextServer().getRequestHandler()

    const isReqMatch = routes
      .map((route) => route.serveRoot)
      .some((route) => req.path.startsWith(route))

    if (isReqMatch) {
      next()
      return
    }

    handle(req, res)
  }
}
