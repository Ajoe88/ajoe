import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { JwtAuthGuard } from "../jwt/jwt.guard";
import { ACLModule } from "../auth/acl.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { JwtStrategy } from "../jwt/jwt.strategy";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  createdAt: new Date(),
  firstName: "exampleFirstName",
  id: "exampleId",
  lastName: "exampleLastName",
  password: "examplePassword",
  roles: ["exampleRoles"],
  updatedAt: new Date(),
  username: "exampleUsername",
};
const CREATE_RESULT = {
  createdAt: new Date(),
  firstName: "exampleFirstName",
  id: "exampleId",
  lastName: "exampleLastName",
  password: "examplePassword",
  roles: ["exampleRoles"],
  updatedAt: new Date(),
  username: "exampleUsername",
};
const FIND_MANY_RESULT = [
  {
    createdAt: new Date(),
    firstName: "exampleFirstName",
    id: "exampleId",
    lastName: "exampleLastName",
    password: "examplePassword",
    roles: ["exampleRoles"],
    updatedAt: new Date(),
    username: "exampleUsername",
  },
];
const FIND_ONE_RESULT = {
  createdAt: new Date(),
  firstName: "exampleFirstName",
  id: "exampleId",
  lastName: "exampleLastName",
  password: "examplePassword",
  roles: ["exampleRoles"],
  updatedAt: new Date(),
  username: "exampleUsername",
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const userInfo = { name: "abc123", roles: ["user"] };
const jwtAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    request.user = userInfo;
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("User", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: service,
        },
        {
          provide: JwtStrategy,
          useValue: {
            validate: () => userInfo,
          },
        },
      ],
      controllers: [UserController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(jwtAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /api/users", async () => {
    await request(app.getHttpServer())
      .post("/api/users")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /api/users", async () => {
    await request(app.getHttpServer())
      .get("/api/users")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /api/users/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/api/users"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /api/users/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/api/users"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
