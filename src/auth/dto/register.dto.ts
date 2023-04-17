import { Field, InputType } from "@nestjs/graphql";
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, IsStrongPassword, ValidateBy } from "class-validator";

@InputType()
export class RegisterInput {
    @Field(() => String!)
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => String!)
    @IsString()
    @IsNotEmpty()
    username: string;

    @Field(() => String!)
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @Field(() => String!)
    @IsStrongPassword({ minSymbols: 0 })
    @IsString()
    @IsNotEmpty()
    password: string;

    @Field(() => String!)
    @ValidateBy({
        name: 'matchPassword',
        validator: {
            validate: (value, { object }) => value === (object as any).password,
            defaultMessage: () => 'confirm password didnt match'
        },
    })
    @IsString()
    @IsNotEmpty()
    confirmPassword: string;
}