import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserSkillService } from './user_skill.service';
import { CreateUserSkillDto } from './dto/create-user_skill.dto';
import { UpdateUserSkillDto } from './dto/update-user_skill.dto';
import { LoggedUserDto } from 'src/auth/dto/logged-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user-skill')
export class UserSkillController {
  constructor(private readonly userSkillService: UserSkillService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createUserSkillDto: CreateUserSkillDto, @Req() req: { user: LoggedUserDto }) {
    return this.userSkillService.create(createUserSkillDto, req.user);
  }

  @Get()
  findAll() {
    return this.userSkillService.findAll();
  }

  @Get('/find-one')
  findOne(@Body() createUserSkillDto: CreateUserSkillDto) {
    return this.userSkillService.findOne(createUserSkillDto);
  }

  @Get('/user/:id')
  findUserSkills(@Param('id') id: string) {
    return this.userSkillService.findUserSkills(+id);
  }

  @Get('/skill/:id')
  findSkillUsers(@Param('id') id: string) {
    return this.userSkillService.findSkillUsers(+id);
  }

  @Delete()
  @UseGuards(AuthGuard)
  remove(@Body() createUserSkillDto: CreateUserSkillDto) {
    return this.userSkillService.remove(createUserSkillDto);
  }
}
