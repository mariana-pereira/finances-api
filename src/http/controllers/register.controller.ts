import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { RegisterUserUseCase } from 'src/use-cases/register-user';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';

const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type RegisterBodySchema = z.infer<typeof registerBodySchema>

@Controller('auth')
export class RegisterController {
  constructor(private registerUser: RegisterUserUseCase) {}

  @Post('signup')
  @UsePipes(new ZodValidationPipe(registerBodySchema))
  async handle(@Body() body: RegisterBodySchema) {
    const { name, email, password } = body;
    
    return this.registerUser.execute({ name, email, password });
  }
}