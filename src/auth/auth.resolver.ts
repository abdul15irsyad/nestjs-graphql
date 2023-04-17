import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginObject } from './object-types/login.objects';
import { handleError } from '../global/utils/error.util';
import { LoginInput } from './dto/login.dto';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { isEmpty } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { ACCESS_TOKEN_EXPIRED, REFRESH_TOKEN_EXPIRED } from './auth.config';
import { RegisterInput } from './dto/register.dto';

@Resolver()
export class AuthResolver {
    @Inject(UserService)
    private userService: UserService;
    @Inject(JwtService)
    private jwtService: JwtService;

    @Mutation(() => LoginObject)
    async login(@Args('loginInput', { type: () => LoginInput }) loginInput: LoginInput): Promise<LoginObject> {
        try {
            const { username, password } = loginInput;
            const authUser = await this.userService.findOneBy([{ username }, { email: username }]);
            if (isEmpty(authUser)) throw new UnauthorizedException('username or password is incorrect');
            console.log(compareSync(password, authUser.password));
            if (!compareSync(password, authUser.password)) throw new UnauthorizedException('username or password is incorrect');

            // create json web token
            const accessToken = this.jwtService.sign({
                id: authUser.id,
                type: 'access-token'
            }, { expiresIn: ACCESS_TOKEN_EXPIRED });
            const refreshToken = this.jwtService.sign({
                id: authUser.id,
                type: 'refresh-token',
            }, { expiresIn: ACCESS_TOKEN_EXPIRED });

            return {
                accessToken: {
                    token: accessToken,
                    expiresIn: ACCESS_TOKEN_EXPIRED,
                    grantType: 'password',
                },
                refreshToken: {
                    token: refreshToken,
                    expiresIn: REFRESH_TOKEN_EXPIRED,
                }
            }
        } catch (error) {
            handleError(error);
        }
    }

    @Mutation(() => User)
    async register(@Args('registerInput', { type: () => RegisterInput }) registerInput: RegisterInput) {
        try {
            const newUser = await this.userService.create(registerInput);
            return newUser;
        } catch (error) {
            handleError(error);
        }
    }
}
