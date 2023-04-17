import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './auth.config';

@Module({
    imports: [
        JwtModule.register({
            secret: JWT_SECRET,
        }),
        forwardRef(() => UserModule)
    ],
    providers: [AuthService, AuthResolver]
})
export class AuthModule { }
