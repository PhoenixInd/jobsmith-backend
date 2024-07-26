import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { PrismaService } from 'src/prisma.service';
import { SkillService } from 'src/skill/skill.service';

@Module({
  controllers: [JobController],
  providers: [JobService, PrismaService, SkillService],
})
export class JobModule {}
