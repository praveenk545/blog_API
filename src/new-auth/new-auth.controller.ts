import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ValidationPipe, UsePipes, Req, UseGuards } from '@nestjs/common';
import { NewAuthService } from './new-auth.service';
import { CreateNewUserDto } from './dto/create-new-user.dto';
import { UpdateNewAuthDto } from './dto/update-new-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './dto/user-login.dto';
import { Response } from 'express';
import { CurrentUser } from './user.decorator';
import { NewUser } from './entities/new-user.entity';
import { CurrentUserGuard } from './create-current.guard';


@ApiTags("Auth and user")
@Controller('new-auth')
export class NewAuthController {
  constructor(private readonly newAuthService: NewAuthService) {}

  @Post('login')
async  userLogin(@Body()userLoginDto:UserLoginDto,@Res()res:Response){
  
    const{token,user}=await this.newAuthService.login(userLoginDto)
    res.cookie('IsAuthenticated',true,{maxAge:2*60*60*100})//max age 2 hours
    res.cookie('Authentication',token,{
      httpOnly:true,
      maxAge:20*60*60*100,
    });
    return res.send({success:true,user})
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  create(@Body() createNewUserDto:CreateNewUserDto,@Req() req:Request) {
    return this.newAuthService.register(createNewUserDto);
  }

  // Route to return current authentication state

  @Get('authstatus')
  @UseGuards(CurrentUserGuard)
  authStatus(@CurrentUser()user:NewUser){
    return {
      status:!!user,user
    }
  }
  // Route  to logout the user

  @Post('logout')
  logout(@Req()req:Request,@Res()res:Response){
res.clearCookie('Authentication');
res.clearCookie('IsAuthenticated');
return res.status(200).send({success:true});
  }
}
