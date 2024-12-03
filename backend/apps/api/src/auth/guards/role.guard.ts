import { applyDecorators, CanActivate, ExecutionContext, Injectable, SetMetadata, UseGuards } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { Observable } from "rxjs";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get('roles', context.getHandler()) || [];
        const request = context.switchToHttp().getRequest();
        const userRole = request.user['role']
        if (!roles) {
            return true;
        }
        return roles.includes(userRole);
    }

}


export function Roles(...roles: string[]) {

    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(RoleGuard),
    );
}