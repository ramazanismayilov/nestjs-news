import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsString, Length } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  @Length(3, 30)
  @IsAlphanumeric()
  @ApiProperty({ default: 'johndoe' })
  username: string;

  @IsString()
  @Length(6, 30)
  @ApiProperty({ default: 'john123' })
  password: string;
}
