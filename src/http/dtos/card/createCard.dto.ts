import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  number: string;
  @IsNotEmpty()
  @IsNumber()
  limit: number;
  @IsNotEmpty()
  @IsDateString()
  expiry_day: Date;
}
