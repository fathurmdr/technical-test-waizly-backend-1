import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8, {
    message: 'password must be longer than or equal to 8 characters',
  })
  @IsNotEmpty()
  password: string;
}
