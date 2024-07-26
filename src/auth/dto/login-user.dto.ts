import { IsString, IsNotEmpty, IsEmail, MinLength, ValidateIf } from 'class-validator';

export class LoginUserDto {
    @ValidateIf(o => o.username === undefined)
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;
}