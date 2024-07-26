import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOfferDto {
    @IsNotEmpty()
    @IsNumber({}, { message: 'jobId must be a number' })
    jobId: number;
}
