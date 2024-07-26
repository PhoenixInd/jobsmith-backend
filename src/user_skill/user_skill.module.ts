import { Module } from '@nestjs/common';
import { UserSkillService } from './user_skill.service';
import { UserSkillController } from './user_skill.controller';
import { PrismaService } from 'src/prisma.service';
import { SkillService } from 'src/skill/skill.service';

@Module({
  controllers: [UserSkillController],
  providers: [UserSkillService, PrismaService, UserSkillService, SkillService],
})
export class UserSkillModule {}
