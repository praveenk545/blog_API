import { PartialType } from '@nestjs/swagger';
import { CreateNewcategoryDto } from './create-newcategory.dto';

export class UpdateNewcategoryDto extends PartialType(CreateNewcategoryDto) {}
