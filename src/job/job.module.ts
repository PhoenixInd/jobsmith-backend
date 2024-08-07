import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { PrismaService } from 'src/prisma.service';
import { SkillService } from 'src/skill/skill.service';
import { UserService } from 'src/user/user.service';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  controllers: [JobController],
  providers: [JobService, PrismaService, SkillService, UserService, ProfileService],
})
export class JobModule {}
