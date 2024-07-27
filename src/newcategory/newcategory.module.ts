import { Module } from '@nestjs/common';
import { NewcategoryService } from './newcategory.service';
import { NewcategoryController } from './newcategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Newcategory } from './entities/newcategory.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Newcategory])],
  controllers: [NewcategoryController],
  providers: [NewcategoryService],
})
export class NewcategoryModule {}
