import { IsInt, IsString, IsNumber, Length, Min } from "class-validator";
export class DistanceFromOperatorResponse
{
    @IsInt()
    @Min(0)
    id!: number;

    @IsString()
    @Length(1, 20)
    firstName!: string;

    @IsString()
    @Length(1, 20)
    surName!: string;

    @IsNumber()
    distance!: number;
}