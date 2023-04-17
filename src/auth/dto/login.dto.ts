import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class LoginInput {
    @Field(() => String!)
    @IsString()
    @IsNotEmpty()
    username: string;

    @Field(() => String!)
    @IsString()
    @IsNotEmpty()
    password: string;
}