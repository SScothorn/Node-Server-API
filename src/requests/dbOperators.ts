import { IsInt, IsNumber, Min } from "class-validator";

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

export class GetClosestRequest
{
    @IsNumber()
    longitude!: number;

    @IsNumber()
    latitude!: number;

    @IsNumber()
    maxDistance!: number;
}