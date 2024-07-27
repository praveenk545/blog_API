import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, UseInterceptors, ClassSerializerInterceptor, Req, UseGuards, UploadedFile, BadRequestException, Res } from '@nestjs/common';
import { NewpostService } from './newpost.service';
import { CreateNewpostDto } from './dto/create-newpost.dto';
import { UpdateNewpostDto } from './dto/update-newpost.dto';
import { ApiTags } from '@nestjs/swagger';
import { Query } from '@nestjs/common';
import { NewUser } from 'src/new-auth/entities/new-user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
// import { AuthGuard } from '@nestjs/passport/dist';
// import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { CurrentUser } from 'src/new-auth/user.decorator';
import { CurrentUserGuard } from 'src/new-auth/create-current.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes,  } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { ACGuard, UseRoles } from 'nest-access-control';

@ApiTags("New-Post")
@Controller('newpost')
@UseInterceptors(ClassSerializerInterceptor)

export class NewpostController {
  constructor(private readonly newpostService: NewpostService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'),ACGuard)
  @UseRoles({
    possession:'any',
    action:'create',
    resource:'newpost',
  })
  create(@Body() createNewpostDto: CreateNewpostDto,@Req() req:Request,@CurrentUser() user:NewUser) {
     
    
    // used for -->req.user as User
    console.log(user)
    //@ts-ignore
    return this.newpostService.create(createNewpostDto,req.user as NewUser);
  }

  @Get()
  @UseGuards(CurrentUserGuard)
  findAll(@Query() query:any,@Req() req:Request,@CurrentUser() user:NewUser) {
    console.log(user)
    return this.newpostService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newpostService.findOne(+id);
  }

  @Get('/slug/:slug')
  findByslug(@Param('slug') slug: string) {
    return this.newpostService.findBySlug(slug);
  }



  //file upload
  @Post('upload-photo')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array', // 👈  array of files
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('files',{
// this object options contain file folder 
storage:diskStorage({
  destination:'./uploads',
  filename:(req,file,callback)=>{
    const name=file.originalname.split('.')[0];
    const fileExtension=file.originalname.split('.')[1];
    const newFileName= name.split("").join('_')+'_'+Date.now()+'.'+fileExtension;
    callback(null,newFileName)
  }
}),
fileFilter:(req,file,callback)=>{
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
    return callback(null,false);
  }callback(null,true)
}
      
  }))
  uploadPhoto(@UploadedFile()file:Express.Multer.File){
  // console.log(file)
  if(!file){
   throw new BadRequestException('file is not an image')
  } 
  else{
    const response={
      filePath:`http://localhost:3000/newpost/pictures/${file.filename}`,
    };
    return response;
  }
  }

  
  // get file
  @Get('pictures/:filename')
  async getPicture(@Param('filename')filename:any,@Res()res:Response){
    res.sendFile(filename,{root:'./uploads'});
    // console.log(res.sendFile(filename,{}))
    

  }

 


  @Patch(':slug')
  @UseGuards(AuthGuard('jwt'),ACGuard)
  @UseRoles({
    possession:'any',
    action:'update',
    resource:'newpost',
  })
  update(@Param('slug') slug: string, @Body() updateNewpostDto: UpdateNewpostDto) {
    return this.newpostService.update(slug, updateNewpostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'),ACGuard)
  @UseRoles({
    possession:'any',
    action:'delete',
    resource:'newpost',
  })
  remove(@Param('id') id: string) {
    return this.newpostService.remove(+id);
  }
}
