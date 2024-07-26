import { IsNotEmpty, IsInt } from "class-validator";

export class CreateUserSkillDto {
    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsInt()
    skillId: number;
}
