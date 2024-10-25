import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  mobileNo: string;

  @IsNotEmpty()
  countryCode: string;

  @IsEnum(['ADMIN', 'USER'])
  role: 'ADMIN' | 'USER';

  @IsArray()
  access: string[];
}
