import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new skill' })
  @ApiResponse({ status: 201, description: 'Skill created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Skill already exists' })
  @UseGuards(AuthGuard)
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillService.create(createSkillDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all skills' })
  @ApiResponse({ status: 200, description: 'Get all skills' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.skillService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a skill by id' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  findOne(@Param('id') id: string) {
    return this.skillService.findOne(+id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a skill' })
  @ApiResponse({ status: 200, description: 'Skill updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillService.update(+id, updateSkillDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a skill' })
  @ApiResponse({ status: 200, description: 'Skill deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.skillService.remove(+id);
  }
}
