import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { UserInfo } from './UserInfo'
import { Credentials, Tokens } from './Credentials'

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('api/login')
  async login(@Body() body: Credentials): Promise<UserInfo> {
    console.log('JWT验证 - Step 1: 用户请求登录')
    const user = await this.authService.validateUser(
      body.username,
      body.password
    )
    if (!user) {
      throw new UnauthorizedException('The passed credentials are incorrect')
    }
    return user
  }

  @Post('api/jwt')
  async loginJwt(@Body() body: Credentials): Promise<Tokens> {
    const user = await this.authService.validateUser(
      body.username,
      body.password
    )
    if (!user) {
      throw new UnauthorizedException('The passed credentials are incorrect')
    }

    const tokenInfo: Tokens = await this.authService.genToken({
      name: user.username,
      roles: user.roles,
    })
    return {
      ...user,
      accessToken: tokenInfo.accessToken,
      refreshToken: tokenInfo.refreshToken,
    }
  }

  // @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Post('api/register')
  async register(@Body() body: Credentials) {
    return await this.authService.registerUser(body.username, body.password)
  }
}
