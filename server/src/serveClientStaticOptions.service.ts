import * as path from "path";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ServeStaticModuleOptions,
  ServeStaticModuleOptionsFactory,
} from "@nestjs/serve-static";

const SERVE_CLIENT_STATIC_ROOT_PATH_VAR = "SERVE_CLIENT_STATIC_ROOT_PATH";
const DEFAULT_STATIC_MODULE_OPTIONS_LIST: ServeStaticModuleOptions[] = [
  {
    serveRoot: "/swagger",
    rootPath: path.join(__dirname, "swagger"),
  },
];

@Injectable()
export class ServeClientStaticOptionsService
  implements ServeStaticModuleOptionsFactory {
  private readonly logger = new Logger(ServeClientStaticOptionsService.name);

  constructor(private readonly configService: ConfigService) {}

  createLoggerOptions(): ServeStaticModuleOptions[] {
    const serveStaticRootPath = this.configService.get(
      SERVE_CLIENT_STATIC_ROOT_PATH_VAR
    );
    if (serveStaticRootPath) {
      const resolvedPath = path.resolve(serveStaticRootPath);
      this.logger.log(`Serving client static files from ${resolvedPath}`);
      return [
        ...DEFAULT_STATIC_MODULE_OPTIONS_LIST,
        { rootPath: resolvedPath, exclude: ["/api*", "/graphql"] },
      ];
    }
    return DEFAULT_STATIC_MODULE_OPTIONS_LIST;
  }
}
