import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Find the user along with their role from the database
    const userWithRole = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { Role: true },
    });

    if (!userWithRole) {
        throw new UnauthorizedException('User not found');
    }

    const userRole = userWithRole.Role.name;

    // Check if the user's role is included in the required roles
    const hasRole = roles.includes(userRole);
    if (!hasRole) {
      throw new UnauthorizedException('You do not have the necessary role to access this resource');
    }

    return true;
  }
}
