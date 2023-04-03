import { IsNotEmpty, IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateTransactionDto {
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
  @IsString()
  @IsNotEmpty()
  source: string;
}
