import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { NODE_ENV } from './app.config';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from './database/database.config';
import { AppResolver } from './app.resolver';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
            cache: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
            renderPath: '/',
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
            autoSchemaFile: join(__dirname, 'src/schema.gql'),
        }),
    ],
    controllers: [AppController],
    providers: [AppService, AppResolver],
})
export class AppModule { }
