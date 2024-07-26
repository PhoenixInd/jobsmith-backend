import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JobSkillService } from './job_skill.service';
import { CreateJobSkillDto } from './dto/create-job_skill.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('job-skill')
export class JobSkillController {
  constructor(private readonly jobSkillService: JobSkillService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createJobSkillDto: CreateJobSkillDto) {
    return this.jobSkillService.create(createJobSkillDto);
  }

  @Get()
  findAll() {
    return this.jobSkillService.findAll();
  }

  @Get('/find-one')
  findOne(@Body() createJobSkillDto: CreateJobSkillDto) {
    return this.jobSkillService.findOne(createJobSkillDto);
  }

  @Get('/job/:id')
  findJobSkills(@Param('id') id: string) {
    return this.jobSkillService.findJobSkills(+id);
  }

  @Delete()
  @UseGuards(AuthGuard)
  remove(@Body() createJobSkillDto: CreateJobSkillDto) {
    return this.jobSkillService.remove(createJobSkillDto);
  }
}
