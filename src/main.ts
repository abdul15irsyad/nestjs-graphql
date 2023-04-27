import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { PORT, NODE_ENV, ORIGINS } from './app.config';
import { graphqlUploadExpress } from 'graphql-upload-ts';

async function bootstrap() {
    const logger = new Logger('Main');
    const app = await NestFactory.create(AppModule);

    app.enableCors({ origin: ORIGINS, methods: '*' });
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });
    app.useGlobalPipes(new ValidationPipe({
        stopAtFirstError: true,
        transform: true,
    }));
    app.use(graphqlUploadExpress({
        maxFileSize: 100_000_000,
        maxFiles: 10,
    }));

    await app.listen(PORT, () => logger.log(`App running on PORT = ${PORT} and NODE_ENV = "${NODE_ENV}"`));
}
bootstrap();
