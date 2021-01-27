import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// @ts-ignore
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log(`JWT验证 - Step 4: 被守卫调用`);
    if (payload.clientId) {
      // 公共接口部分
      return {
        clientId: payload.clientId,
        secret: payload.secret,
      };
    } else {
      // 返回的对象注入到 request.user
      return {
        name: payload.name,
        roles: payload.roles,
        permissions: payload.permissions,
      };
    }
  }
}