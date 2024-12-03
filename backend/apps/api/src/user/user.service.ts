
import { PrismaService } from '@app/db';
import { Injectable, Param, Query } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { endianness } from 'os';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async GetAll() {
        return await this.prisma.user.findMany()
    }

    async create(createUserDto: CreateUserDto) {
        return await this.prisma.user.create({
            data: createUserDto
        })
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: { email }
        })
    }

    async findById(id: string) {
        return await this.prisma.user.findUnique({
            where: { id }
        })
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return await this.prisma.user.update({
            where: { id: id },
            data: updateUserDto
        })
    }

    async delete(id: string) {
        return this.prisma.user.delete({
            where: { id: id }
        })
    }



}
