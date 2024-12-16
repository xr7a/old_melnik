import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    email: string;
    role: Role;
    passwordHash: string;
    refreshToken?: string;
}

export class UpdateUserDto {
    email?: string;
    role?: Role;
    passwordHash?: string;
    refreshToken?: string;
}
