import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class createPostDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;
}

export class updatePostDto {
    @ApiProperty()
    @IsString()
    title?: string;

    @ApiProperty()
    @IsString()
    content?: string;
}