import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class PaginationDto {
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    page: number;

    @Type(() => Number)
    @IsInt()
    @IsOptional()
    limit: number;
}