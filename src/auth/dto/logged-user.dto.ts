import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class LoggedUserDto {
    @IsNumber()
    @IsNotEmpty()
    id: number
    
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}