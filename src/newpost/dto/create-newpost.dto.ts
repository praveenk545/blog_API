import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Newcategory } from "src/newcategory/entities/newcategory.entity";
export class CreateNewpostDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title:string;
    @ApiProperty()
    @IsNotEmpty({message:'Please enter something for the content'})
    @IsString()
    
    content:string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    mainImageUrl:string;


    // @ApiPropertyOptional({type:'array',items:{format:'binary',type:'string'},name:'file'})
    // @IsOptional()
    // @IsFile()
    // @HasExtension(['JPEG','JPG','PNG','jpeg','jpg',])
    // mainImageUrl:MemoryStoredFile;
    // @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    categoryId:number;

    @IsOptional()
    category:Newcategory
}
