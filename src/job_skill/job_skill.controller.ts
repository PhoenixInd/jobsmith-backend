import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JobSkillService } from './job_skill.service';
import { CreateJobSkillDto } from './dto/create-job_skill.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/role/role.decorator';
import { RolesGuard } from 'src/role/role.guard';

@ApiTags('Job-skill')
@Controller('job-skill')
export class JobSkillController {
  constructor(private readonly jobSkillService: JobSkillService) {}

  @Post()
  @Role('Company', 'Admin')
  @ApiOperation({ summary: 'Create a job-skill' })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createJobSkillDto: CreateJobSkillDto) {
    return this.jobSkillService.create(createJobSkillDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all job-skill' })
  @ApiResponse({ status: 200, description: 'Ok' })
  findAll() {
    return this.jobSkillService.findAll();
  }

  @Get('/find-one')
  @ApiOperation({ summary: 'Get a job-skill' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  findOne(@Body() createJobSkillDto: CreateJobSkillDto) {
    return this.jobSkillService.findOne(createJobSkillDto);
  }

  @Get('/job/:id')
  @ApiOperation({ summary: 'Get all job skills by id' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  findJobSkills(@Param('id') id: string) {
    return this.jobSkillService.findJobSkills(+id);
  }

  @Delete()
  @Role('Company', 'Admin')
  @ApiOperation({ summary: 'Delete a job-skill' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Body() createJobSkillDto: CreateJobSkillDto) {
    return this.jobSkillService.remove(createJobSkillDto);
  }
}
