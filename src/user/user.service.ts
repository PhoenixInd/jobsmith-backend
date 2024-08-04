import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({ data: createUserDto });
    user.password = "";
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    users.forEach(user => {
      user.password = "";
    })
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
        throw new NotFoundException('User not found');
    }
    user.password = ""; // remove password from response
    return user;
  }

  async findOneByEmail(createuser: CreateUserDto | LoginUserDto) {
    let user : UpdateUserDto | undefined; 
    if(createuser.email) {
        user = await this.prisma.user.findUnique({ where: { email: createuser.email } });
        if(!user) {
          throw new NotFoundException('User not found');
        }
        user.password = "";
        return user;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    const user = await this.prisma.user.update({ where: { id }, data: updateUserDto });
    user.password = "";
    return user;
  }

  async remove(id: number) {
    await this.findOne(id);
    const user = await this.prisma.user.delete({ where: { id } });
    user.password = "";
    return user;
  }
}
