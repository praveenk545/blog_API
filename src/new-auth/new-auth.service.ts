import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateNewUserDto } from './dto/create-new-user.dto';
import { UpdateNewAuthDto } from './dto/update-new-auth.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { NewUser } from './entities/new-user.entity';
import *as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class NewAuthService {
 constructor(@InjectRepository(NewUser) private repo:Repository<NewUser>,
entity:EntityManager, private jwtService:JwtService){}

  async login(userLoginDto:UserLoginDto){
    console.log(userLoginDto)
  const user=await this.repo.createQueryBuilder('newuser').addSelect('newuser.password').where('newuser.email=:email',{email:userLoginDto.email}).getOne()

console.log(user)
  if(!user){
  throw new UnauthorizedException('bad credentials--user not found');
}
else{
  //verify that the supplied password hash is matching with the password hash in database
   if(await this.verifyPassword(userLoginDto.password,user.password)){
  const token= await this.jwtService.signAsync({
    email:user.email,
    id:user.id
  });
  delete user.password;
  return {token,user}
   }
   else{
    throw new UnauthorizedException('bad credentials--password missmatch');
   }
}
  } 
async verifyPassword(password:string,hash:string){
  return await bcrypt.compare(password,hash);
}

//create

 async register(createNewUserDto:CreateNewUserDto){
  const{email}=createNewUserDto;
  const checkForUser=await this.repo.findOne({where:{email}});
  if(checkForUser){
    throw new BadRequestException('email is already chosen, please chose another one');

   }else{
    const user=new NewUser()
    user.firstName=createNewUserDto.firstName;
    user.lastName=createNewUserDto.lastName;
    user.email=createNewUserDto.email
    user.password=createNewUserDto.password;
    user.profilePic=createNewUserDto.profilePic;
    let data=await this.repo.save(user);
    return{
      statusCode:200,data:data,
      message:["data saved"]
    }
   }
 }
}
