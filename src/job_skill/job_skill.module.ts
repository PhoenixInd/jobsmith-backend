import { Module } from '@nestjs/common';
import { JobSkillService } from './job_skill.service';
import { JobSkillController } from './job_skill.controller';
import { PrismaService } from 'src/prisma.service';
import { JobService } from 'src/job/job.service';
import { SkillService } from 'src/skill/skill.service';
import { UserService } from 'src/user/user.service';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  controllers: [JobSkillController],
  providers: [JobSkillService, PrismaService, JobService, SkillService, UserService, ProfileService],
})
export class JobSkillModule {}
