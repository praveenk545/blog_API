import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewcategoryService } from './newcategory.service';
import { CreateNewcategoryDto } from './dto/create-newcategory.dto';
import { UpdateNewcategoryDto } from './dto/update-newcategory.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Category")
@Controller('newcategory')
export class NewcategoryController {
  constructor(private readonly newcategoryService: NewcategoryService) {}

  @Post()
  create(@Body() createNewcategoryDto: CreateNewcategoryDto) {
    return this.newcategoryService.create(createNewcategoryDto);
  }

  @Get()
  findAll() {
    return this.newcategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newcategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewcategoryDto: UpdateNewcategoryDto) {
    return this.newcategoryService.update(+id, updateNewcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newcategoryService.remove(+id);
  }
}
