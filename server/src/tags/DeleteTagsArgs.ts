import { ArgsType, Field } from "@nestjs/graphql";
import { TagsWhereUniqueInput } from "./TagsWhereUniqueInput";

@ArgsType()
class DeleteTagsArgs {
  @Field(() => TagsWhereUniqueInput, { nullable: false })
  where!: TagsWhereUniqueInput;
}

export { DeleteTagsArgs };
