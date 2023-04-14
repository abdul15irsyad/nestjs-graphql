import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";
import { Meta } from "../../global/object-types/find-all.object";

@ObjectType()
export class FindAllUserObject {
    @Field(() => [User], { nullable: true })
    data: User[];

    @Field(() => Meta)
    meta: Meta;
}