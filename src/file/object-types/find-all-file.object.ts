import { Field, ObjectType } from "@nestjs/graphql";
import { Meta } from "../../global/object-types/find-all.object";
import { File } from "../entities/file.entity";

@ObjectType()
export class FindAllFileObject {
    @Field(() => [File], { nullable: true })
    data: File[];

    @Field(() => Meta)
    meta: Meta;
}