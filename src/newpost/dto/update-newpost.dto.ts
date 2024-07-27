import { PartialType } from '@nestjs/swagger';
import { CreateNewpostDto } from './create-newpost.dto';

export class UpdateNewpostDto extends PartialType(CreateNewpostDto) {}
