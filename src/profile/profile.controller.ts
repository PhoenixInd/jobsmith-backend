import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({ summary: 'Create a profile' })
  @ApiResponse({ status: 201, description: 'Profile created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Profile already exists' })
  @UseGuards(AuthGuard)
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all profiles' })
  @ApiResponse({ status: 200, description: 'Get all profiles' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.profileService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a profile' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a profile' })
  @ApiResponse({ status: 200, description: 'Profile updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a profile' })
  @ApiResponse({ status: 200, description: 'Profile deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
