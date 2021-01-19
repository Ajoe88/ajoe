import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneTagsArgs,
  FindManyTagsArgs,
  TagsCreateArgs,
  TagsUpdateArgs,
  TagsDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyTagsArgs>(args: Subset<T, FindManyTagsArgs>) {
    return this.prisma.tags.findMany(args);
  }
  findOne<T extends FindOneTagsArgs>(args: Subset<T, FindOneTagsArgs>) {
    return this.prisma.tags.findOne(args);
  }
  create<T extends TagsCreateArgs>(args: Subset<T, TagsCreateArgs>) {
    return this.prisma.tags.create<T>(args);
  }
  update<T extends TagsUpdateArgs>(args: Subset<T, TagsUpdateArgs>) {
    return this.prisma.tags.update<T>(args);
  }
  delete<T extends TagsDeleteArgs>(args: Subset<T, TagsDeleteArgs>) {
    return this.prisma.tags.delete(args);
  }
}
