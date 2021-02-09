import * as path from 'path'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  ServeStaticModuleOptions,
  ServeStaticModuleOptionsFactory,
} from '@nestjs/serve-static'
import routers from './routers'

const SERVE_STATIC_ROOT_PATH_VAR = 'SERVE_STATIC_ROOT_PATH'

@Injectable()
export class ServeStaticOptionsService
  implements ServeStaticModuleOptionsFactory {
  private readonly logger = new Logger(ServeStaticOptionsService.name)

  constructor(private readonly configService: ConfigService) {}

  createLoggerOptions(): ServeStaticModuleOptions[] {
    const serveStaticRootPath = this.configService.get(
      SERVE_STATIC_ROOT_PATH_VAR
    )

    let updatedRouters = routers.filter(
      (route) => route.serveRoot != '/graphql'
    )

    if (serveStaticRootPath) {
      updatedRouters = routers.map((route) => {
        if (route.serveRoot === '/admin') {
          route.rootPath = path.resolve(serveStaticRootPath)
        }
        return route
      })
      this.logger.log(
        `Serving static files from:,  ${JSON.stringify(updatedRouters)}}`
      )
    }

    return [...updatedRouters]
  }
}
