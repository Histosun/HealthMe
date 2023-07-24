import { Context } from "koa";
import { MedicationService } from "../service/medication.service";
import { SingupRequest, LoginRequest } from "../request/user.request";
import { MedicationAttributes, UserAttributes } from "../dao";

export interface SignupResponse {
    message: string
}

export const MedicationController = {
    getMedicationByUser: async (ctx: Context) => {
        let userInfo = ctx.state.user as UserAttributes;
        ctx.body = await MedicationService.getMedicationByUser(userInfo);
    },

    removeMedicationByUser: async (ctx: Context) => {
        let userInfo = ctx.state.user as UserAttributes;
        let medicationInfo = ctx.request.body as MedicationAttributes;
        ctx.body = await MedicationService.removeMedicationByUser(userInfo, medicationInfo);
    }
}