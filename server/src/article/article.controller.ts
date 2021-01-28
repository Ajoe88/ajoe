import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
// import * as basicAuthGuard from "../auth/basicAuth.guard";
import {JwtAuthGuard} from "../jwt/jwt.guard"
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import * as errors from "../errors";
import { ArticleService } from "./article.service";
import { ArticleCreateInput } from "./ArticleCreateInput";
import { ArticleWhereInput } from "./ArticleWhereInput";
import { ArticleWhereUniqueInput } from "./ArticleWhereUniqueInput";
import { ArticleUpdateInput } from "./ArticleUpdateInput";
import { Article } from "./Article";

@swagger.ApiBasicAuth()
@swagger.ApiTags("articles")
@common.Controller("api/articles")
export class ArticleController {
  constructor(
    private readonly service: ArticleService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(JwtAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Article })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: Record<string, never>,
    @common.Body() data: ArticleCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Article> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Article",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Article"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      ...query,
      data: data,
      select: {
        Authors: true,
        content: true,
        createdAt: true,
        id: true,
        Title: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(JwtAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Article] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: ArticleWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Article[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Article",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        Authors: true,
        content: true,
        createdAt: true,
        id: true,
        Title: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(JwtAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Article })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: Record<string, never>,
    @common.Param() params: ArticleWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Article | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Article",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        Authors: true,
        content: true,
        createdAt: true,
        id: true,
        Title: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(JwtAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Article })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: Record<string, never>,
    @common.Param() params: ArticleWhereUniqueInput,
    @common.Body()
    data: ArticleUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Article | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Article",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Article"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        ...query,
        where: params,
        data: data,
        select: {
          Authors: true,
          content: true,
          createdAt: true,
          id: true,
          Title: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(JwtAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Article })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: Record<string, never>,
    @common.Param() params: ArticleWhereUniqueInput
  ): Promise<Article | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          Authors: true,
          content: true,
          createdAt: true,
          id: true,
          Title: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
