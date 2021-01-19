import { ArgsType, Field } from "@nestjs/graphql";
import { TagsWhereUniqueInput } from "./TagsWhereUniqueInput";
import { TagsUpdateInput } from "./TagsUpdateInput";

@ArgsType()
class UpdateTagsArgs {
  @Field(() => TagsWhereUniqueInput, { nullable: false })
  where!: TagsWhereUniqueInput;
  @Field(() => TagsUpdateInput, { nullable: false })
  data!: TagsUpdateInput;
}

export { UpdateTagsArgs };
