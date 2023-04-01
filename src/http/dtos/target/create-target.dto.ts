import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTargetDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
