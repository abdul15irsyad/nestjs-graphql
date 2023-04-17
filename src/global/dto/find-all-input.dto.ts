import { Field, InputType, Int } from "@nestjs/graphql";
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

@InputType()
export class FindAllInput {
    @Field(() => Int, { nullable: true })
    @Min(1)
    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    page?: number = 1;

    @Field(() => Int, { nullable: true })
    @Min(1)
    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    limit?: number = 10;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    search?: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    orderBy?: string = 'createdAt';

    @Field(() => String, { nullable: true })
    @IsIn(["ASC", "DESC", "asc", "desc"])
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    orderDir?: "ASC" | "DESC" | "asc" | "desc" = 'desc';
}