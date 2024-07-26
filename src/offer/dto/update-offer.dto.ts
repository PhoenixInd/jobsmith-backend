import { PartialType } from '@nestjs/mapped-types';
import { CreateOfferDto } from './create-offer.dto';
import { IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator';

export class UpdateOfferDto extends PartialType(CreateOfferDto) {
    @IsOptional()
    @IsDate({ message: 'StartDate must be a valid date' })
    StartDate?: Date;

    @IsOptional()
    @IsDate({ message: 'EndDate must be a valid date' })
    EndDate?: Date;
    
    @IsOptional()
    @IsNumber({}, { message: 'userId must be a number' })
    userId?: number;
    
    @IsOptional()
    @IsBoolean({ message: 'Show must be a boolean' })
    show?: boolean;
}
