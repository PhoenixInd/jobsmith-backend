import { IsNotEmpty, IsNumber } from "class-validator";
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
}
