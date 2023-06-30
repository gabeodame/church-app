import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDate,
  IsOptional,
} from 'class-validator';

export class AuthSignUpDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  dob?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  gender?: string;
}

export class AuthSignInDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
