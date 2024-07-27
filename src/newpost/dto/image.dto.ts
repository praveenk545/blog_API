
import { IsOptional, IsString } from "class-validator";

export class ImageDto {
    
    @IsOptional()
    image:string;
}

