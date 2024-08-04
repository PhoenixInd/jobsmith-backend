import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { PrismaService } from 'src/prisma.service';
import { OfferService } from 'src/offer/offer.service';
import { JobService } from 'src/job/job.service';
import { SkillService } from 'src/skill/skill.service';
import { UserService } from 'src/user/user.service';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService, PrismaService, OfferService, JobService, SkillService, UserService, ProfileService],
})
export class ApplicationModule {}
