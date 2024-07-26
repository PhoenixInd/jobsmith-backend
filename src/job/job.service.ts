import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma.service';
import { SkillService } from 'src/skill/skill.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService, private skillService: SkillService, private userService: UserService){}
  async create(createJobDto: CreateJobDto) {
    const { title, description, requirements, userId, skills } = createJobDto;

    if (skills) {
      await Promise.all(
        skills.map(async (skillId) => {
          const skill = await this.skillService.findOne(skillId);
          if (!skill) {
            throw new NotFoundException('Skill not found');
          }
        }),
      );
    }

    const company = await this.userService.findOne(userId);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    // Create the job with the required fields
    const job = await this.prisma.job.create({
      data: {
        title,
        description,
        requirements,
        userId,
        skills: {
          create: skills.map((skillId) => ({
            skillId: skillId,
          })),
        },
      },
    });

    return job;
  }

  async findAll() {
    return this.prisma.job.findMany();
  }

  async findOne(id: number) {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    const { title, description, requirements, userId, skills } = updateJobDto;
    
    await this.findOne(id);

    if (skills && skills.length > 0) {
      await Promise.all(
        skills.map(async (skillId) => {
          const skill = await this.skillService.findOne(skillId);
          if (!skill) {
            throw new NotFoundException('Skill not found');
          }
        }),
      );
    }

    const updatedJob = await this.prisma.job.update({
      where: { id },
      data: {
        title,
        description,
        requirements,
        userId,
        skills: {
          deleteMany: {},
          create: skills ? skills.map((skillId) => ({ skillId })) : [],
        },
      },
    });

    return updatedJob;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.job.delete({ where: { id } });
  }
}
