import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateInvestmentDto {
  @IsString()
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  @IsString()
  subtype: string;
  @IsString()
  tax: string;
  name: string;
  quantity: number;
  @IsNotEmpty()
  @IsDateString()
  applicationDate: Date;
  @IsDateString()
  redeemDate: Date;
  @IsNotEmpty()
  @IsBoolean()
  hasLiquidity: boolean;
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
