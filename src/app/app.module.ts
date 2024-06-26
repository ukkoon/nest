import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import '../config'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../public'),
      serveRoot: '/public/', //last slash was important
    }),
  ],
  controllers: [
    AppController,
    AuthController,
  ],
  providers: [
    AppService,
    PrismaService,
    AuthService,
  ],
})
export class AppModule {}
