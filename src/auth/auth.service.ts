import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { checkIfEncoded, useDecoding } from 'src/helpers/Base64';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

    async register(user: CreateUserDto) {
        let exists = await this.userService.findOneByEmail(user);
        if (exists) {
            throw new ConflictException('User already exists');
        }
        if(checkIfEncoded(user.password)){
            throw new BadRequestException('Password must not be sent raw');
        }
        const decodedPassword = useDecoding(user.password);
        user.password = await bcrypt.hash(decodedPassword, 10);
        return this.userService.create(user);
    }

    async login(loginUser: LoginUserDto) {
        let user = await this.userService.findOneByEmail(loginUser);
    
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        const decodedPassword = useDecoding(loginUser.password);
        const isPasswordValid = await bcrypt.compare(decodedPassword, user.password);
    
        if (isPasswordValid) {
            const payload = { sub: user.name, id: user.id, email: user.email };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        }
    
        throw new UnauthorizedException('Invalid credentials');
    }

}
