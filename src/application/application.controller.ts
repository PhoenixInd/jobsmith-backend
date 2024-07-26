import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { LoggedUserDto } from 'src/auth/dto/logged-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Application')
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @Role('Proffessional', 'Admin')
  @ApiOperation({ summary: 'Create a new application' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationService.create(createApplicationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all applications' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @UseGuards(AuthGuard)
  findAll() {
    return this.applicationService.findAll();
  }

  @Get('/user')
  @ApiOperation({ summary: 'Get a list of user applications' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @UseGuards(AuthGuard)
  findUserApplications(@Req() req: { user: LoggedUserDto }) {
    return this.applicationService.findUserApplications(req.user.id);
  }

  @Get('/user/nonfinished')
  @ApiOperation({ summary: 'Get a list of user applications not finished' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @UseGuards(AuthGuard)
  findNonFinishedUserApplications(@Req() req: { user: LoggedUserDto }) {
    return this.applicationService.findUserApplicationsNotFinished(req.user.id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get an application by id' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.applicationService.findOne(+id);
  }

  @Patch('/:id')
  @Role('Proffessional', 'Admin')
  @ApiOperation({ summary: 'Update an application' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Updated' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationService.update(+id, updateApplicationDto);
  }

  @Delete('/:id')
  @Role('Proffessional', 'Admin')
  @ApiOperation({ summary: 'Delete an application' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.applicationService.remove(+id);
  }
}
