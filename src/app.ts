import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import './config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle("Ukkoon-Nest-Project")
        .setDescription('Ukkoon-Nest-Project desc')
        .setVersion('1.0.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer' }, 'access-token')
        .build();

    if (process.env.NODE_ENV !== 'prod') {
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('docs', app, document);
    }

    await app.listen(process.env.PORT);
}
bootstrap();
