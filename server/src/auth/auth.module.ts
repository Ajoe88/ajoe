import { Module, forwardRef } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "src/jwt/jwt.strategy";
import { jwtConstants } from "src/jwt/jwt.constants";
// eslint-disable-next-line
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { BasicStrategy } from "./basic.strategy";
import { PasswordService } from "./password.service";

@Module({
  imports: [
    forwardRef(() => UserModule), 
    PassportModule.register({ defaultStrategy: 'jwt' }),  
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' }, // token 过期时效
    })
  ],
  providers: [AuthService, PasswordService, AuthResolver, BasicStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, PasswordService],
})
export class AuthModule {}
