import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RegisterController } from './controllers/register.controller';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthenticateController } from './controllers/authenticate.controller';
import { AuthModule } from './auth/auth.module';
import { CreateAccountController } from './controllers/create-account.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [RegisterController, AuthenticateController, CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
