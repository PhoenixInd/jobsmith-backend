import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggedUserDto } from './dto/logged-user.dto';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 200, description: 'Login successful' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    login(@Body() user:LoginUserDto) {
        return this.authService.login(user);
    }

    @Post('register')
    @ApiOperation({ summary: 'Register' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 409, description: 'User already exists' })
    register(@Body() user:CreateUserDto) {
        return this.authService.register(user);
    }

    @Get('validate')
    @ApiOperation({ summary: 'Validate' })
    @ApiResponse({ status: 200, type: LoggedUserDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @UseGuards(AuthGuard)
    validate(@Req() req: { user: LoggedUserDto }){
        return this.authService.validate(req.user.id);
    }
}
