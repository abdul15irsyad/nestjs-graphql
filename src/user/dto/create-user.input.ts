import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
    @Field(() => String!)
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => String!)
    @IsString()
    @IsNotEmpty()
    username: string;

    @Field(() => String!)
    @IsString()
    @IsNotEmpty()
    email: string;

    @Field(() => String!)
    @IsString()
    @IsNotEmpty()
    password: string;
}
