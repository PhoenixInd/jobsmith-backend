import { Module } from '@nestjs/common';
import { UserSkillService } from './user_skill.service';
import { UserSkillController } from './user_skill.controller';
import { PrismaService } from 'src/prisma.service';
import { SkillService } from 'src/skill/skill.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [UserSkillController],
  providers: [UserSkillService, PrismaService, SkillService, UserService],
})
export class UserSkillModule {}
