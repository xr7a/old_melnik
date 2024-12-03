import { BadRequestException, ForbiddenException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ConfigService } from "@nestjs/config";
import * as argon2 from "argon2";
import { Role } from '@prisma/client';
import { CreateUserDto } from '../user/dto/user.dto';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async signUp(data: RegisterDto) {
        const existUser = await this.userService.findByEmail(data.email);
        if (existUser) { throw new ForbiddenException("user already exist"); }
        const passwordHash = await this.hashData(data.password);
        const user = await this.userService.create({ 
            email: data.email,
            name: data.name, 
            role: data.role,
            passwordHash 
        });
        const tokens = await this.generateTokens(user.id, user.email, user.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;

    }

    async signIn(data: LoginDto) {
        const user = await this.userService.findByEmail(data.email);
        if (!user) {
            throw new NotFoundException("user doesn't exist");
        }
        const passwordMatches = await argon2.verify(user.passwordHash, data.password);
        if (!passwordMatches) {
            throw new BadRequestException("password is incorrect");
        }
        const tokens = await this.generateTokens(user.id, user.email, user.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    async logout(id: string) {
        await this.userService.update(id, { refreshToken: null })
    }

    hashData(data: string) {
        return argon2.hash(data);
    }

    async updateRefreshToken(id: string, refreshToken: string) {
        const hashedToken = await this.hashData(refreshToken);
        await this.userService.update(id, { refreshToken: hashedToken });
    }

    async generateTokens(id: string, email: string, role: Role) {
        const payload = { id, role, email };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload,
                {
                    secret: this.configService.get<string>('JWT_SECRET'),
                    expiresIn: "2h"
                }
            ),
            this.jwtService.signAsync(payload,
                {
                    secret: this.configService.get<string>('JWT_SECRET'),
                    expiresIn: "2h"
                }
            ),
        ]);
        return { accessToken, refreshToken }
    }

    async refreshTokens(id: string, refreshToken: string) {
        const user = await this.userService.findById(id);
        if (!user || !refreshToken)
            throw new ForbiddenException("Access Denied");
        const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);
        if (!refreshTokenMatches)
             throw new ForbiddenException("Access Denied");
        const tokens = await this.generateTokens(user.id, user.email, user.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
    }
}
