import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  bank: string;
  @IsNotEmpty()
  @IsString()
  branch: string;
  @IsNotEmpty()
  @IsString()
  accountNumber: string;
}
