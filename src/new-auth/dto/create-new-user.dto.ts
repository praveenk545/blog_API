import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
export class CreateNewUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName:string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName:string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email:string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password:string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    profilePic:string;
}
