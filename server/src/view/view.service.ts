import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as path from 'path'

import next from 'next'
import NextServer from 'next/dist/next-server/server/next-server'

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer
  private readonly logger = new Logger(ViewService.name)
  constructor(private readonly configService: ConfigService) {}
  isProduction() {
    return process.env.NODE_ENV === 'production'
  }
  async onModuleInit(): Promise<void> {
    const isProduction = this.isProduction()
    try {
      this.logger.log(`the running env is:  ${process.env.NODE_ENV}`)
      // need to change SERVE_STATIC_CLIENT_PATH in .env for production
      const clientDir = './' // isProduction ? this.configService.get('SERVE_CLIENT_ROOT_PATH') : ;
      const resolvedPath = path.resolve(clientDir)
      this.logger.log(`Client static files from: ${resolvedPath}`)
      if (!resolvedPath) {
        throw new Error('Cannot find client root')
      }

      this.server = next({ dev: !isProduction, dir: resolvedPath })
      await this.server.prepare()

      this.logger.log(`Serving client static files from ${resolvedPath}`)
    } catch (error) {
      console.log(error)
    }
  }

  getNextServer(): NextServer {
    return this.server
  }
}
