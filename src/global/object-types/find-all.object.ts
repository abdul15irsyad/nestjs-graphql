import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Meta {
    @Field(() => Number)
    currentPage?: number;

    @Field(() => Number)
    totalPage?: number;

    @Field(() => Number)
    totalData?: number;

    @Field(() => Number)
    totalAllData?: number;
}

@ObjectType()
export class FindAll {
    @Field(() => Meta)
    meta: Meta;
}