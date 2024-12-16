import { Body, Controller, Get, Param, Post, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { Request, Response } from "express";
import { RoleGuard, Roles } from './guards/role.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("register")
    async signup(@Body() data: RegisterDto) {
        return await this.authService.signUp(data);
    }

    @Post("login")
    async signin(@Body() authDto: LoginDto) {
        return this.authService.signIn(authDto);
    }

    @UseGuards(AccessTokenGuard)
    @Get("logout")
    async logout(@Req() req: Request) {
        await this.authService.logout(req.user["id"]);
    }

    @UseGuards(RefreshTokenGuard)
    @Get("refresh-token")
    async refreshTokens(@Req() req: Request) {
        const id = req.user['id'];
        const token = req.headers['authorization'].split(' ')[1];
        return await this.authService.refreshTokens(id, token);
    }

    @Roles("Reader", "Author")
    @UseGuards(AccessTokenGuard)
    @Get("me")
    async GetMe(@Req() req: Request) {
        return req.user;
    }


}
