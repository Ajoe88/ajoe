import { ArgsType, Field } from "@nestjs/graphql";
import { TagsCreateInput } from "./TagsCreateInput";

@ArgsType()
class CreateTagsArgs {
  @Field(() => TagsCreateInput, { nullable: false })
  data!: TagsCreateInput;
}

export { CreateTagsArgs };
