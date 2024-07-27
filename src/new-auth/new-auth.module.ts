import { Module } from '@nestjs/common';
import { NewAuthService } from './new-auth.service';
import { NewAuthController } from './new-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewUser } from './entities/new-user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy.';

@Module({
  imports:[TypeOrmModule.forFeature([NewUser]),JwtModule.register({
    secret:'secretKey',
    signOptions:{
      algorithm:'HS512',
      expiresIn:'1d'
    }
  }),PassportModule.register({defaultStrategy:'jwt'})],
  controllers: [NewAuthController],
  providers: [NewAuthService,JwtStrategy,],
})
export class NewAuthModule {}
