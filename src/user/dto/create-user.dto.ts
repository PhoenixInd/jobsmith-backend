import { IsNotEmpty, IsString, IsEmail, IsInt, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    @MaxLength(50, { message: 'Name must be at most 50 characters long' })
    name: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @MaxLength(100, { message: 'Password must be at most 100 characters long' })
    password: string;

    @IsNotEmpty()
    @IsInt({ message: 'roleId must be an integer' })
    roleId: number;
}
