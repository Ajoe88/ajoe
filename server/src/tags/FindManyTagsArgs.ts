import { ArgsType, Field } from "@nestjs/graphql";
import { TagsWhereInput } from "./TagsWhereInput";

@ArgsType()
class FindManyTagsArgs {
  @Field(() => TagsWhereInput, { nullable: true })
  where?: TagsWhereInput;
}

export { FindManyTagsArgs };
