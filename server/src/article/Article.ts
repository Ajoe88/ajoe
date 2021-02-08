import { ObjectType, Field } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsDate } from 'class-validator'
import { Type } from 'class-transformer'
@ObjectType()
class Article {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  Authors!: string | null
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  content!: string
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  Title!: string
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date
}
export { Article }
