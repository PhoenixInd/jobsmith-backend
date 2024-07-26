import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationDto } from './create-application.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
    @IsNotEmpty()
    @IsString()
    suggestion: string

    @IsNotEmpty()
    @IsNumber()
    selectionTagId: number;

    @IsNotEmpty()
    @IsNumber()
    rankingId: number;
}
