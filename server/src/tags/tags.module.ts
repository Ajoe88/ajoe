import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { TagsService } from "./tags.service";
import { TagsController } from "./tags.controller";
import { TagsResolver } from "./tags.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [TagsController],
  providers: [TagsService, TagsResolver],
  exports: [TagsService],
})
export class TagsModule {}
