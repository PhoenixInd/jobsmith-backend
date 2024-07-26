import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { LoggedUserDto } from './dto/logged-user.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(
    context: ExecutionContext,
  ):Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      req['user'] = payload as LoggedUserDto;
      const refreshToken = await this.refreshToken(token);
      req['refreshToken'] = refreshToken;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(req: any): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private refreshToken(token: string) {
    const {sub, id, email} = this.jwtService.decode(token);
    const payload = {sub, id, email };
    const refreshToken = this.jwtService.sign(payload);
    return refreshToken;
  }
}
