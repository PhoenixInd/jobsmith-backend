import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateJobSkillDto {
    @IsNumber()
    @IsNotEmpty()
    skillId: number;

    @IsNumber()
    @IsNotEmpty()
    jobId: number;
}
