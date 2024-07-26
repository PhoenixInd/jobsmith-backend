import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/role/role.decorator';
import { RolesGuard } from 'src/role/role.guard';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @Role('Company', 'Admin')
  @ApiOperation({ summary: 'Create a new job' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all jobs' })
  @ApiResponse({ status: 200, description: 'Ok' })
  findAll() {
    return this.jobService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a job by id' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Ok' })
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(+id);
  }

  @Patch('/:id')
  @Role('Company', 'Admin')
  @ApiOperation({ summary: 'Update a job' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Updated' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(+id, updateJobDto);
  }

  @Delete('/:id')
  @Role('Company', 'Admin')
  @ApiOperation({ summary: 'Delete a note' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.jobService.remove(+id);
  }
}
