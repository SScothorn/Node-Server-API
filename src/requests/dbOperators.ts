import { IsInt, IsNumber, IsString, Length, Min } from "class-validator";

export class UpdatePosRequest
{
    @IsInt()
    @Min(0)
    id!: number;

    @IsNumber()
    longitude!: number;

    @IsNumber()
    latitude!: number;
}