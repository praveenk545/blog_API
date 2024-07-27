import { Module } from '@nestjs/common';
import { NewpostService } from './newpost.service';
import { NewpostController } from './newpost.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Newpost } from './entities/newpost.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Newpost])],
  controllers: [NewpostController],
  providers: [NewpostService],
})
export class NewpostModule {}
