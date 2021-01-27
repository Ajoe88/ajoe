import { Controller, Post, Body, UseGuards, UnauthorizedException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { JwtUserInfo, UserInfo } from "./UserInfo";
import { Credentials } from "./Credentials";
import { AuthGuard } from '@nestjs/passport';

@ApiTags("auth")
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("api/login")
  async login(@Body() body: Credentials): Promise<UserInfo> {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const user = await this.authService.validateUser(
      body.username,
      body.password
    );
    if (!user) {
      throw new UnauthorizedException("The passed credentials are incorrect");
    }
    return user;
  }
  // jwt login
  @Post("api/jwt")
  async loginJwt(@Body() body: Credentials): Promise<JwtUserInfo> {
    // 前端加密密码需要解密
    let user = await this.authService.validateUser(
      body.username,
      body.password
    );
    if (!user) {
      throw new UnauthorizedException("The passed credentials are incorrect");
    }

    
    // 颁发 token
    const tokenInfo = await this.authService.genToken({
      name: user.username,
      roles: user.roles,
    });

    return Object.assign(user, {
      accessToken: tokenInfo.accessToken, 
      refreshToken: tokenInfo.refreshToken
    });
  }

  
  // @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Post('api/register')
  async register(@Body() body: any) {
    return await this.authService.registerUser(
      body.username,
      body.password
    );
  }

}
