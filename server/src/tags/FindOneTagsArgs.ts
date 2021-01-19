import { ArgsType, Field } from "@nestjs/graphql";
import { TagsWhereUniqueInput } from "./TagsWhereUniqueInput";

@ArgsType()
class FindOneTagsArgs {
  @Field(() => TagsWhereUniqueInput, { nullable: false })
  where!: TagsWhereUniqueInput;
}

export { FindOneTagsArgs };
