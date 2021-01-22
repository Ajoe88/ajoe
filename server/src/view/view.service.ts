import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import { ConfigService } from "@nestjs/config";
import * as path from "path";

import next from 'next'
import NextServer from 'next/dist/next-server/server/next-server'

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer
  private readonly logger = new Logger(ViewService.name);
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    try {
        
        const clientDir = './src/client'; // this.configService.get('SERVE_STATIC_CLIENT_PATH');
        const resolvedPath = path.resolve(clientDir);
        if(!clientDir) {
            throw new Error('Cannot find client root')
        }
        
        this.server = next({ dev: true, dir: resolvedPath })
        await this.server.prepare()

        this.logger.log(`Serving client static files from ${resolvedPath}`);
    } catch (error) {
      console.log(error)
    }
  }

  getNextServer(): NextServer {
    return this.server
  }
}