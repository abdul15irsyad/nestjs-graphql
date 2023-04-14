import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export class FindAllInput {
    @Field(() => Int)
    @IsNumber()
    @IsNotEmpty()
    page?: number;

    @Field(() => Int)
    @IsNumber()
    @IsNotEmpty()
    limit?: number;

    @Field(() => String)
    @IsNumber()
    @IsNotEmpty()
    search?: string;
}