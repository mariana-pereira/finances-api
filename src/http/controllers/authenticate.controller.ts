import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { AuthenticateUserUseCase } from 'src/use-cases/authenticate-user';
import { z } from 'zod';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('auth')
export class AuthenticateController {
  constructor(private authenticateUser: AuthenticateUserUseCase) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    return this.authenticateUser.execute({ email, password });
  }
}