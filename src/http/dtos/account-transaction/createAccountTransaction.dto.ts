import { IsNotEmpty, IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateAccountTransactionDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;
  @IsNotEmpty()
  @IsNumber()
  amount: number;
  @IsString()
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  @IsString()
  category: string;
}
