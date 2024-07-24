import { IsNotEmpty, IsNumber, IsOptional, IsDate, IsBoolean } from 'class-validator';

export class CreateOfferDto {
    @IsNotEmpty()
    @IsNumber({}, { message: 'jobId must be a number' })
    jobId: number;

    @IsOptional()
    @IsNumber({}, { message: 'userId must be a number' })
    userId?: number;

    @IsOptional()
    @IsDate({ message: 'StartDate must be a valid date' })
    StartDate?: Date;

    @IsOptional()
    @IsDate({ message: 'EndDate must be a valid date' })
    EndDate?: Date;

    @IsOptional()
    @IsBoolean({ message: 'Show must be a boolean' })
    show?: boolean;
}
