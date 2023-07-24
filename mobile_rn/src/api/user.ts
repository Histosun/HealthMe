import request from "./request"

export interface LoginRequest {
    username: string,
    password: string
}

export function login(loginRequest: LoginRequest) {
    return request({
        url: '/user/login',
        method: 'post',
        headers: {
            isToken: false
        },
        data: loginRequest
    });
}