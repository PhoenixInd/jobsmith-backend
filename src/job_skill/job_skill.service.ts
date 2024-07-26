import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobSkillDto } from './dto/create-job_skill.dto';
import { PrismaService } from 'src/prisma.service';
import { JobService } from 'src/job/job.service';
import { SkillService } from 'src/skill/skill.service';

@Injectable()
export class JobSkillService {
  constructor(private prisma: PrismaService, private jobService: JobService, private skillService: SkillService) {}
  async create(createJobSkillDto: CreateJobSkillDto) {
    const skill = this.skillService.findOne(createJobSkillDto.skillId);
    const job = this.jobService.findOne(createJobSkillDto.jobId);

    if (!skill || !job) {
      throw new NotFoundException('Skill or Job not found');
    }

    const jobSkill = await this.prisma.jobSkill.create({ data: createJobSkillDto });


    return jobSkill;
  }

  async findAll() {
    return this.prisma.jobSkill.findMany();
  }

  async findJobSkills(jobId: number) {
    const jobSkills = await this.prisma.jobSkill.findMany({
      where: { jobId },
      include: { Skill: true },
    });
    
    if (jobSkills.length === 0) {
      throw new NotFoundException(`No skills found for job with id ${jobId}`);
    }
    
    return jobSkills;
  }

  async findOne(createJobSkillDto: CreateJobSkillDto) {
    const { jobId, skillId } = createJobSkillDto;
    const jobSkill = await this.prisma.jobSkill.findUnique({
      where: { jobId_skillId: { jobId, skillId } },
    });
    
    if (!jobSkill) {
      throw new NotFoundException(`JobSkill with jobId ${jobId} and skillId ${skillId} not found`);
    }
    
    return jobSkill;
  }

  async remove(createJobSkillDto: CreateJobSkillDto) {
    await this.findOne(createJobSkillDto);
    const { jobId, skillId } = createJobSkillDto;
    const jobSkill = await this.prisma.jobSkill.delete({
      where: { jobId_skillId: { jobId, skillId } },
    });
    
    return jobSkill;
  }
}
