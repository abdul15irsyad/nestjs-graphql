import { IsUUID, IsString, IsNotEmpty } from 'class-validator';
import { CreateRoleInput } from './create-role.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
    @Field(() => String!)
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    id: string;
}
