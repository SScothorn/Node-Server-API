import { IsString, Length } from "class-validator";
export class AddFilmRequest
{
    @IsString()
    @Length(1, 20)
    name!: string;
}