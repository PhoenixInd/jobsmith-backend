import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { ProfileModule } from './profile/profile.module';
import { ApplicationModule } from './application/application.module';
import { SkillModule } from './skill/skill.module';
import { OfferModule } from './offer/offer.module';
import { AuthModule } from './auth/auth.module';
import { UserSkillModule } from './user_skill/user_skill.module';
import { JobSkillModule } from './job_skill/job_skill.module';

import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HomeController } from './home/home.controller';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  }), 
    UserModule, JobModule, ProfileModule, ApplicationModule, SkillModule, OfferModule, AuthModule, UserSkillModule, JobSkillModule],
  controllers: [HomeController],
  providers: [],
})
export class AppModule {}
