import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get("all")
    async GetMe() {
        return await this.userService.GetAll()
    }
}
