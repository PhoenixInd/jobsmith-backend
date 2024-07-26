import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserSkillService } from './user_skill.service';
import { CreateUserSkillDto } from './dto/create-user_skill.dto';
import { UpdateUserSkillDto } from './dto/update-user_skill.dto';
import { LoggedUserDto } from 'src/auth/dto/logged-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user-skill')
export class UserSkillController {
  constructor(private readonly userSkillService: UserSkillService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user skill' })
  @ApiResponse({ status: 201, description: 'User skill created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'User skill already exists' })
  @UseGuards(AuthGuard)
  create(@Body() createUserSkillDto: CreateUserSkillDto, @Req() req: { user: LoggedUserDto }) {
    return this.userSkillService.create(createUserSkillDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user skills' })
  @ApiResponse({ status: 200, description: 'Get all user skills' })
  findAll() {
    return this.userSkillService.findAll();
  }

  @Get('/find-one')
  @ApiOperation({ summary: 'Get a specific user skill' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  findOne(@Body() createUserSkillDto: CreateUserSkillDto) {
    return this.userSkillService.findOne(createUserSkillDto);
  }

  @Get('/user/:id')
  @ApiOperation({ summary: 'Get a list of skills for a specific user' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findUserSkills(@Param('id') id: string) {
    return this.userSkillService.findUserSkills(+id);
  }

  @Get('/skill/:id')
  @ApiOperation({ summary: 'Get a list of users with a specific skill' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  findSkillUsers(@Param('id') id: string) {
    return this.userSkillService.findSkillUsers(+id);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a user skill' })
  @ApiResponse({ status: 200, description: 'User skill deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User skill not found' })
  @UseGuards(AuthGuard)
  remove(@Body() createUserSkillDto: CreateUserSkillDto) {
    return this.userSkillService.remove(createUserSkillDto);
  }
}
