import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserSkillDto } from './dto/create-user_skill.dto';
import { UpdateUserSkillDto } from './dto/update-user_skill.dto';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { SkillService } from 'src/skill/skill.service';
import { LoggedUserDto } from 'src/auth/dto/logged-user.dto';

@Injectable()
export class UserSkillService {
  constructor(private prisma: PrismaService, private userService: UserService, private skillService: SkillService) {}
  async create(createUserSkillDto: CreateUserSkillDto, userDTO: LoggedUserDto) {
    const user = await this.userService.findOne(createUserSkillDto.userId);
    const skill = await this.skillService.findOne(createUserSkillDto.skillId);
    if(user.id !== userDTO.id) {
      throw new UnauthorizedException('You are not authorized to create this skill');
    }
    if(!user || !skill) {
      throw new NotFoundException('User or Skill not found');
    }
    const userSkill = await this.prisma.userSkill.create({data: {userId: user.id, skillId: skill.id}});
    return userSkill;
  }

  async findAll() {
    return this.prisma.userSkill.findMany();
  }

  async findOne(createUserSkillDto: CreateUserSkillDto) {
    const { userId, skillId } = createUserSkillDto;
    const userSkill = await this.prisma.userSkill.findUnique({
      where: { userId_skillId: { userId, skillId } },
    });
    
    if (!userSkill) {
      throw new NotFoundException(`UserSkill with userId ${userId} and skillId ${skillId} not found`);
    }
    
    return userSkill;
  }

  async findUserSkills(userId: number) {
    const userSkills = await this.prisma.userSkill.findMany({
      where: { userId },
      include: { Skill: true },
    });
    
    if (userSkills.length === 0) {
      throw new NotFoundException(`No skills found for user with id ${userId}`);
    }
    
    return userSkills;
  }

  async findSkillUsers(skillId: number) {
    const skillUsers = await this.prisma.userSkill.findMany({
      where: { skillId },
      include: { User: true },
    });
    
    if (skillUsers.length === 0) {
      throw new NotFoundException(`No users found for skill with id ${skillId}`);
    }
    
    return skillUsers;
  }

  async remove(createUserSkillDto: CreateUserSkillDto) {
    await this.findOne(createUserSkillDto);
    const { userId, skillId } = createUserSkillDto;
    const userSkill = await this.prisma.userSkill.delete({
      where: { userId_skillId: { userId, skillId } },
    });
    
    return userSkill;
  }
}
