import { Context } from "koa";
import { UserService } from "../service/user.service";
import { SingupRequest, LoginRequest } from "../request/user.request";

export interface LoginResponse {
    isLoggedin: boolean;
    message: string;
    token: string | undefined;
}

export interface SignupResponse {
    message: string
}

export const UserController = {
    signUp: async (ctx: Context) => {
        let request: SingupRequest = ctx.request.body as SingupRequest;
        ctx.body = await UserService.create(request);
    },

    login: async (ctx: Context) => {
        let request: LoginRequest = ctx.request.body as LoginRequest;
        ctx.body = await UserService.login(request);
    }
}