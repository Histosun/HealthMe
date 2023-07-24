import jwt from "jsonwebtoken";
import { LoginRequest } from "../request/user.request";

export const secretKey = "asidohfoejnmfpo!#@KLDJF))ASDFJKASDweor}{Psd";

export function generateJWT(login: LoginRequest) {
    return jwt.sign(login, secretKey, { expiresIn:  '24h' });
}

export function validateJWT(token: string): LoginRequest | undefined {
    var userInfo: LoginRequest | undefined;
    jwt.verify(token, secretKey, (err, payload) => {
        if (err)
            userInfo = undefined;
        else
            userInfo = payload as LoginRequest;
    })
    return userInfo;
}