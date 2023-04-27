import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { NODE_ENV } from './app.config';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from './database/database.config';
import { UserModule } from './user/user.module';
import { RootModule } from './root/root.module';
import { GraphQLError } from 'graphql';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { FileModule } from './file/file.module';
import { GraphQLUpload } from 'graphql-upload-ts';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
            cache: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: DB_HOST,
            port: DB_PORT,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            database: DB_NAME,
            autoLoadEntities: true,
            synchronize: false,
            logging: false,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: NODE_ENV !== 'production',
            autoSchemaFile: join(process.cwd(), 'schema.gql'),
            useGlobalPrefix: true,
            include: [
                UserModule,
                RoleModule,
                FileModule
            ],
            csrfPrevention: false,
            introspection: true,
            // formatError: (error: GraphQLError) => {
            //     return new GraphQLError(error.message)
            // },
        }),
        RootModule,
        UserModule,
        AuthModule,
        RoleModule,
        FileModule,
    ],
})
export class AppModule { }
