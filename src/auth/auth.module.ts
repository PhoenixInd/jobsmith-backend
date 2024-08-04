import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { RoleService } from 'src/role/role.service';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, RoleService, ProfileService],
})
export class AuthModule {}
