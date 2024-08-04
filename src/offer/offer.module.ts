import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { PrismaService } from 'src/prisma.service';
import { JobService } from 'src/job/job.service';
import { UserService } from 'src/user/user.service';
import { SkillService } from 'src/skill/skill.service';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  controllers: [OfferController],
  providers: [OfferService, PrismaService, JobService, UserService, SkillService, ProfileService],
})
export class OfferModule {}
