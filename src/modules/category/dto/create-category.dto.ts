import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString, Length, Matches } from "class-validator";

export class CreateCategoryDto {
    @Type()
    @IsString()
    @Length(3, 30)
    @ApiProperty()
    name: string

    @Type()
    @IsString()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    @IsOptional()
    @ApiProperty()
    slug: string
}