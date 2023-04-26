import { Field, ObjectType } from "@nestjs/graphql";
import { Role } from "../entities/role.entity";
import { Meta } from "../../global/object-types/find-all.object";

@ObjectType()
export class FindAllRoleObject {
    @Field(() => [Role], { nullable: true })
    data: Role[];

    @Field(() => Meta)
    meta: Meta;
}