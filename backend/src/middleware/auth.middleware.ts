import jwt from "jsonwebtoken";
import { Context, Next } from "koa";
import { secretKey } from "../utils/AuthUtils";

export const authMiddleware = (ctx: Context, next: Next) => {
    if (ctx.header && ctx.header.authorization) {
        const parts = ctx.header.authorization.split(' ');
        if (parts.length === 2) {
            const scheme = parts[0];
            const token = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                try {
                    jwt.verify(token, secretKey, (err, decodedPayload) => {
                        if (err) {
                            throw err;
                        }
                        ctx.state.user = decodedPayload;
                    });

                } catch (error) { }
            }
        }
    }

    return next()
        .catch(err => {
            if (err.status === 401) {
                ctx.status = 401;
                ctx.body =
                    'Protected resource, use valid Authorization header to get access!';
            } else {
                throw err;
            }
        });
}