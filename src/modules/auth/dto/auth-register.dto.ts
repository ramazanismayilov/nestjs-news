import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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
  @Type()
  @IsString()
  @Length(3, 30)
  @IsAlphanumeric()
  @ApiProperty({ default: 'johndoe' })
  username: string;

  @Type()
  @IsString()
  @MinLength(6)
  @ApiProperty({ default: 'john123' })
  password: string;

  @Type()
  @IsEnum(UserGender)
  @ApiProperty({ nullable: true, default: UserGender.MALE })
  gender: UserGender;

  @Type()
  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'John Doe' })
  fullName: string;
}
