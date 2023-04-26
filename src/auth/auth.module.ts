import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './auth.config';
import { RoleModule } from '../role/role.module';

@Module({
    imports: [
        JwtModule.register({
            secret: JWT_SECRET,
        }),
        forwardRef(() => UserModule),
        forwardRef(() => RoleModule),
    ],
    providers: [AuthService, AuthResolver]
})
export class AuthModule { }
