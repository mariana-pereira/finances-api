import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators';
import { InvestmentService } from 'src/application/services/investment/investment.service';
import { CreateInvestmentDto } from 'src/http/dtos/investment/create-investment.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('investments')
export class InvestmentController {
  constructor(private investmentService: InvestmentService) {}

  @Post()
  createAccount(
    @GetUser('id') userId: string,

    @Body() data: CreateInvestmentDto,
    @Headers('Account') accountId: string,
    @Headers('Target') targetId: string,
  ) {
    return this.investmentService.createInvestment(
      userId,
      accountId,
      targetId,
      data,
    );
  }
}
