import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService){}
  async create(createProfileDto: CreateProfileDto) {
    return this.prisma.profile.create({data: createProfileDto});
  }

  async findAll() {
    return this.prisma.profile.findMany({});
  }

  async findOne(id: number) {
    const profile = await this.prisma.profile.findUnique({where: {id}});
    if (!profile) {
      throw new NotFoundException('User not found');
    }
    return profile;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    await this.findOne(id);
    return this.prisma.profile.update({where: {id}, data: updateProfileDto});
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.profile.delete({where: {id}});
  }
}
