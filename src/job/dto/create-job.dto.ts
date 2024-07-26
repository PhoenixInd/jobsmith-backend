import { IsNotEmpty, IsString, MinLength, MaxLength, IsArray, IsOptional, IsNumber } from 'class-validator';

export class CreateJobDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    @MaxLength(100, { message: 'Title must be at most 100 characters long' })
    title: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10, { message: 'Description must be at least 10 characters long' })
    @MaxLength(500, { message: 'Description must be at most 500 characters long' })
    description: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10, { message: 'Requirements must be at least 10 characters long' })
    @MaxLength(300, { message: 'Requirements must be at most 300 characters long' })
    requirements: string;
    
    @IsArray()
    @IsNumber({}, { each: true, message: 'Each skill ID must be a number' })
    skills: number[];

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}
