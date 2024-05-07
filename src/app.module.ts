import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RegisterController } from './controllers/register.controller';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [RegisterController],
  providers: [PrismaService],
})
export class AppModule {}
