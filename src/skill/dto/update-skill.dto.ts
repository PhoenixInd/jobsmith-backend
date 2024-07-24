import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from './create-skill.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {
    @IsNotEmpty()
    @IsNumber()
    id: number;
}
