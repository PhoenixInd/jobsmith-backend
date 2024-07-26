import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
        throw new NotFoundException('User not found');
    }
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOneByEmail(createuser: CreateUserDto | LoginUserDto) {
    let user : UpdateUserDto | undefined; 
    if(createuser.email) {
        user = await this.prisma.user.findUnique({ where: { email: createuser.email } });
        if (user) {
            return user;
        }
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.user.delete({ where: { id } });
  }
}
