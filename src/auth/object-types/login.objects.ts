import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AccessToken {
    @Field(() => String)
    token!: string;

    @Field(() => Number)
    expiresIn: number;

    @Field(() => String)
    grantType: 'password' | 'refresh-token';
}

@ObjectType()
export class RefreshToken {
    @Field(() => String)
    token!: string;

    @Field(() => Number)
    expiresIn: number;
}

@ObjectType()
export class LoginObject {
    @Field(() => AccessToken)
    accessToken: AccessToken;

    @Field(() => RefreshToken)
    refreshToken: RefreshToken;
}