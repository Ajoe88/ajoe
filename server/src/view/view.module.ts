import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'

import { NextMiddleware } from './nextMiddleware'
import { ViewController } from './view.controller'
import { ViewService } from './view.service'

@Module({
  imports: [],
  providers: [ViewService],
  controllers: [ViewController]
})
export class ViewModule implements NestModule{
  configure(userContext: MiddlewareConsumer): void{
    userContext.apply(NextMiddleware)
    // .forRoutes({path: 'bar', method: RequestMethod.PUT})
 }
}