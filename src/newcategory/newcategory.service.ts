import { Injectable } from '@nestjs/common';
import { CreateNewcategoryDto } from './dto/create-newcategory.dto';
import { UpdateNewcategoryDto } from './dto/update-newcategory.dto';
import { Newcategory } from './entities/newcategory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class NewcategoryService {
  constructor(@InjectRepository(Newcategory) private repo: Repository<Newcategory>,
  readonly entityManager: EntityManager,){

  }
  async create(createNewcategoryDto: CreateNewcategoryDto) {
    try{
    let category=new Newcategory()
        category.title=createNewcategoryDto.title;
        category.description=createNewcategoryDto.description;
        let saved = await this.repo.save(category);
        return {
          statusCode: 200,
          message: ['Data saved'],
          data: { id: saved.id },
        };
    }
    catch(error){
      return {
        statusCode: 500,
        message: [error.message],
        stack: error.stack,
      };

    }
  }

 async findAll() {
  try{
    let save= await this.repo.query('select * from "Newcategory" n ');
    return{
      statusCode:200,data:save,message:['successful']
    }

  }catch(error){
    return {
      statusCode: 500,
      message: [error.message],
      stack: error.stack,
    };
  }
   
   
  }

  findOne(id: number) {
    return `This action returns a #${id} newcategory`;
  }

  update(id: number, updateNewcategoryDto: UpdateNewcategoryDto) {
    return `This action updates a #${id} newcategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} newcategory`;
  }
}
