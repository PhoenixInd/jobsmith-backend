import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString({ message: 'Name must be a string' })
    name: string;
}
