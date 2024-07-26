import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateApplicationDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    offerId: number;
    
    @IsNotEmpty()
    @IsNumber()
    statusId: number;

    @IsNotEmpty()
    @IsString()
    url: string
}
