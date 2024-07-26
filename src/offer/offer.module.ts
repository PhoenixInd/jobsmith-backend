import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { PrismaService } from 'src/prisma.service';
import { JobService } from 'src/job/job.service';
import { UserService } from 'src/user/user.service';
import { SkillService } from 'src/skill/skill.service';

@Module({
  controllers: [OfferController],
  providers: [OfferService, PrismaService, JobService, UserService, SkillService],
})
export class OfferModule {}
