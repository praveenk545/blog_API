import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { NewpostModule } from './newpost/newpost.module';
import { NewAuthModule } from './new-auth/new-auth.module';
import { NewcategoryModule } from './newcategory/newcategory.module';
import { Newpost } from './newpost/entities/newpost.entity';
import { NewUser } from './new-auth/entities/new-user.entity';
import { Newcategory } from './newcategory/entities/newcategory.entity';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './new-auth/user-roles';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MulterModule.register({
      dest: './files',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'postgres',
      entities: [Newpost,NewUser,Newcategory],
      synchronize: true,
    }),
    NewpostModule,
    NewcategoryModule,
    NewAuthModule,
    AccessControlModule.forRoles(roles)
    
    
  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
