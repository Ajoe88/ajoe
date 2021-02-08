import { InputType, Field } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional } from 'class-validator'
@InputType()
class ArticleCreateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  Authors?: string | null
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  content!: string
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  Title!: string
}
export { ArticleCreateInput }
