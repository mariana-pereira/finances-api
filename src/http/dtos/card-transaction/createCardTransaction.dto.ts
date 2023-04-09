import { IsNotEmpty, IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateCardTransactionDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;
  @IsNotEmpty()
  @IsNumber()
  amount: number;
  @IsString()
  @IsNotEmpty()
  type: string;
}
