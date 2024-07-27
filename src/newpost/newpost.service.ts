import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNewpostDto } from './dto/create-newpost.dto';
import { UpdateNewpostDto } from './dto/update-newpost.dto';
import { Newpost } from './entities/newpost.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { NewUser } from 'src/new-auth/entities/new-user.entity';

@Injectable()
export class NewpostService {
  constructor(@InjectRepository(Newpost)
  private userRepository: Repository<Newpost>,
  readonly entityManager: EntityManager,){

  }

 async create(createNewpostDto: CreateNewpostDto,newUser:NewUser) {
    try {
      let user = new Newpost(); 
     // error TypeError: Cannot read properties of undefined (reading 'id')
      // user.userId=newUser.id;
      user.title = createNewpostDto.title;
      user.content=createNewpostDto.content;
      user.maingImageUrl=createNewpostDto.mainImageUrl;
      // user.slug=createNewpostDto.title.split("").join('_').toLocaleLowerCase();
     Object.assign(user,createNewpostDto)
      let saved = await this.userRepository.save(user);
      return {
        statusCode: 200,
        message: ['Data saved'],
        data: { id: saved.id },
      };
    } catch (error) {
      console.log('error', error);
      return {
        statusCode: 500,
        message: [error.message],
        stack: error.stack,
      };
    }

    // simple code for post entity
    // let user=new Newpost()
    // user.userId=1;
    // Object.assign(user,createNewpostDto)
    // this.userRepository.create(user)
    // return await this.userRepository.save(user)
  }

 async findAll(query?:string) {
    try {
      const  myQuery=this.userRepository.createQueryBuilder("newpost").leftJoinAndSelect("newpost.category","category").leftJoinAndSelect("newpost.user","newuser")
     
      //check if query is present or not
      if(!(Object.keys(query).length===0)&& query.constructor===Object){

          const queryKeys=Object.keys(query);
          //if check title key is present
          if(queryKeys.includes('title'))
            {
              myQuery.where('newpost.title LIKE:title',{title:`%${query['title']}`})

          }
          // check if the sort key is present, we will sort by title field only
          if(queryKeys.includes('sort')){
             myQuery.orderBy('newpost.title',query['sort'].toUpperCase())
          }
          // if check category is present, show only selected category items
          if(queryKeys.includes('category')){
            myQuery.andWhere('category.title=:cat',{cat:query['category']})
          }
          
          return await myQuery.getMany()
     
      }else{
        return await myQuery.getMany()
      }

    } catch (error) {
      // console.log('post service error')
      return { statusCode: 500, message: [error.name,error.type] };
    }}

  async findOne(id: number) {
    try{
      let data=await this.userRepository.findOne({
        where: { id: id },
      })
      return { statusCode: 200, data: data };

    }catch(error){
      return{statusCode:500,message:[error.message]}
    }
  }

  async findBySlug(slug:string){
    try{
      const post= await this.userRepository.findOne({where:{slug}});
      return { statusCode: 200, data: post };


    }catch(error){
   throw new BadRequestException (`Post with slug ${slug} not found`)
    }
  }

 async update(slug:string, updateNewpostDto: UpdateNewpostDto) {
    const post=await this.userRepository.findOne({where:{slug:slug}})
    if(!post){
      throw new BadRequestException('post not found')
    }
    post.updateAt=new Date(Date.now())
    post.category=updateNewpostDto.category;
    Object.assign(post,updateNewpostDto)
    return this.userRepository.save(post);
  }

 async remove(id: number) {
  const post=await this.userRepository.findOne({where:{id}})
  if(!post){
    throw new BadRequestException('post not found')
  }
  await this.userRepository.remove(post)
  return{
    success:true,data:post
  }
  }


  //for image
  async image(id:number){
    try{
      let data=await this.userRepository.findOne({
        where: { id: id },
      })
      return { statusCode: 200, data: data };

    }catch(error){
      return{statusCode:500,message:[error.message]}
    }
  }
}
