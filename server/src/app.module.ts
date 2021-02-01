import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ArticleModule } from "./article/article.module";
import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { MorganModule } from "nest-morgan";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ViewModule  } from './view/view.module';

@Module({
  controllers: [],
  imports: [
    UserModule,
    ArticleModule,
    ACLModule,
    AuthModule,
    MorganModule,
    ViewModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          debug: process.env.NODE_ENV !== "production",
          autoSchemaFile: true,
          playground,
          introspection: playground || introspection,
          cors: {
            origin: ["http://localhost:3000"],
            credentials: true,
          },
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    })
  ],
  providers: [],
})
export class AppModule {}
