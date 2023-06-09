import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String!)
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;
}
