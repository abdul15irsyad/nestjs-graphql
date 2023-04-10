import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { PORT, NODE_ENV, ORIGINS } from './app.config';

async function bootstrap() {
    const logger = new Logger('Main');
    const app = await NestFactory.create(AppModule);

    app.enableCors({ origin: ORIGINS, methods: '*' });
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    await app.listen(PORT, () => logger.log(`App running on PORT=${PORT} and NODE_ENV=${NODE_ENV}`));
}
bootstrap();
