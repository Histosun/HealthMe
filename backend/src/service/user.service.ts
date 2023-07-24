import { LoginResponse, SignupResponse } from "../controller/user.controller";
import { User, UserAttributes } from "../dao";
import { SingupRequest, LoginRequest } from "../request/user.request";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secretKey } from "../utils/AuthUtils";

export const UserService = {
    create: async (request: SingupRequest): Promise<SignupResponse> => {
        if(await User.findOne({ where: { username: request.username } })) {
            return { message: "Username already exits!" };
        }

        await User.create({ username: request.username, password: bcrypt.hashSync(request.password)});
        return { message: "User created!"}
    },

    login: async (request: LoginRequest): Promise<LoginResponse> => {
        let user = (await User.findOne({ where: { username: request.username } }));
        if(!user) {
            return { isLoggedin: false, token: undefined, message: "user does not exists." }
        }
        let userInfo = user.get();
        if(!await bcrypt.compareSync(request.password, userInfo.password)) {
            return { isLoggedin: false, token: undefined, message: "password error!" }
        }

        const token = jwt.sign(userInfo, secretKey)

        return { isLoggedin: true, token: token, message: "Login successful!" };
    }
}