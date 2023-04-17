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

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
            cache: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
            renderPath: '/assets',
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
            logging: NODE_ENV === 'development',
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: NODE_ENV !== 'production',
            autoSchemaFile: join(process.cwd(), 'schema.gql'),
            useGlobalPrefix: true,
            // formatError: (error: GraphQLError) => {
            //     return new GraphQLError(error.message)
            // },
        }),
        RootModule,
        UserModule,
        AuthModule,
    ],
})
export class AppModule { }
