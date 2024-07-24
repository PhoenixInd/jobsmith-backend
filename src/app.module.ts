import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { ProfileModule } from './profile/profile.module';
import { ApplicationModule } from './application/application.module';
import { SkillModule } from './skill/skill.module';
import { OfferModule } from './offer/offer.module';

@Module({
  imports: [UserModule, JobModule, ProfileModule, ApplicationModule, SkillModule, OfferModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
