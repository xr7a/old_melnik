import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class PaginationDto {
    @Type(() => Number)
    page: number;

    @Type(() => Number)
    @IsInt()
    limit: number;
}