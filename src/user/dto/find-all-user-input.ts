import { Field, InputType } from "@nestjs/graphql";
import { FindAllInput } from "../../global/dto/find-all-input.dto";
import { IsOptional, IsUUID } from "class-validator";

@InputType()
export class FindAllUserInput extends FindAllInput {
    @Field(() => String, { nullable: true })
    @IsUUID()
    @IsOptional()
    roleId?: string;
}