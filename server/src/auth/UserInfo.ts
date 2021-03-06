import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../user/User'

@ObjectType()
export class UserInfo implements Partial<User> {
  @Field(() => String)
  username!: string
  @Field(() => [String])
  roles!: string[]
}

export class JwtUserInfo implements Partial<User> {
  @Field(() => String)
  username!: string
  @Field(() => [String])
  roles!: string[]
  @Field(() => [String])
  accessToken!: string[]
  @Field(() => [String])
  refreshToken!: string[]
}
