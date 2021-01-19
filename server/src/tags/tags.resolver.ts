import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { TagsService } from "./tags.service";
import { CreateTagsArgs } from "./CreateTagsArgs";
import { UpdateTagsArgs } from "./UpdateTagsArgs";
import { DeleteTagsArgs } from "./DeleteTagsArgs";
import { FindManyTagsArgs } from "./FindManyTagsArgs";
import { FindOneTagsArgs } from "./FindOneTagsArgs";
import { Tags } from "./Tags";

@graphql.Resolver(() => Tags)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class TagsResolver {
  constructor(
    private readonly service: TagsService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Tags])
  @nestAccessControl.UseRoles({
    resource: "Tags",
    action: "read",
    possession: "any",
  })
  async tags(
    @graphql.Args() args: FindManyTagsArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Tags[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Tags",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Tags, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Tags",
    action: "read",
    possession: "own",
  })
  async tags(
    @graphql.Args() args: FindOneTagsArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Tags | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Tags",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Tags)
  @nestAccessControl.UseRoles({
    resource: "Tags",
    action: "create",
    possession: "any",
  })
  async createTags(
    @graphql.Args() args: CreateTagsArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Tags> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Tags",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Tags"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Tags)
  @nestAccessControl.UseRoles({
    resource: "Tags",
    action: "update",
    possession: "any",
  })
  async updateTags(
    @graphql.Args() args: UpdateTagsArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Tags | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Tags",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Tags"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Tags)
  @nestAccessControl.UseRoles({
    resource: "Tags",
    action: "delete",
    possession: "any",
  })
  async deleteTags(@graphql.Args() args: DeleteTagsArgs): Promise<Tags | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
