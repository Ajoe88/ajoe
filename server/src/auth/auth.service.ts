import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from "./password.service";
import {jwtConstants} from '../jwt/jwt.constants'

import { UserService } from "../user/user.service";
import { UserInfo } from "./UserInfo";
import {ForbiddenException} from '../errors'
import { Tokens } from "./Credentials";
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<UserInfo | null> {
    const user = await this.userService.findOne({
      where: { username },
    });
    if (user && (await this.passwordService.compare(password, user.password))) {
      const { roles } = user;
      return { username, roles };
    }
    return null;
  }

  async registerUser(    
    username: string,
    password: string
    ): Promise<any> {
      const user = await this.userService.findOne({
        where: { username },
      });
      if(user) {
        return new ForbiddenException('username has already exist')
      } else {
        const createRes = await this.userService.create({
          data: {
            username, password
          },
          select: {
            createdAt: true,
            firstName: true,
            id: true,
            lastName: true,
            roles: true,
            updatedAt: true,
            username: true,
          },
        });
        return createRes
      }
  }

  async genToken(payload: any): Promise<Tokens> {
    const accessToken = `Bearer ${this.jwtService.sign(payload)}`;
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: jwtConstants.refreshTokenExpiresIn,
    });
    return { accessToken, refreshToken };
  }
}
