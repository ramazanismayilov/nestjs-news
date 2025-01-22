import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { UserGender } from 'src/modules/user/user.types';

export class AuthRegisterDto {
  @IsString()
  @Length(3, 30)
  @IsAlphanumeric()
  @ApiProperty({ default: 'johndoe' })
  username: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ default: 'john123' })
  password: string;

  @IsEnum(UserGender)
  @ApiProperty({ nullable: true, default: UserGender.MALE })
  gender: UserGender;

  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'John Doe' })
  fullName: string;
}
