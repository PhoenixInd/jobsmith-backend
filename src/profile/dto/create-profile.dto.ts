import { IsOptional, IsString, IsNumber, IsUrl, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
    @IsNotEmpty()
    @IsNumber({}, { message: 'userId must be a number' })
    userId: number;

    @IsOptional()
    @IsString({ message: 'Bio must be a string' })
    @MinLength(10, { message: 'Bio must be at least 10 characters long' })
    @MaxLength(500, { message: 'Bio must be at most 500 characters long' })
    bio?: string;

    @IsOptional()
    @IsString({ message: 'Location must be a string' })
    @MinLength(3, { message: 'Location must be at least 3 characters long' })
    @MaxLength(100, { message: 'Location must be at most 100 characters long' })
    location?: string;

    @IsOptional()
    @IsString({ message: 'Website must be a string' })
    @IsUrl({}, { message: 'Website must be a valid URL' })
    website?: string;
}
