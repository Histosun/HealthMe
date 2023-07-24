import { Medication, MedicationAttributes, User, UserAttributes } from "../dao";

export const MedicationService = {
    getMedicationByUser: async (userInfo: UserAttributes) => {
        let user = await User.findOne({
            where:{
                id: userInfo.id,
            },
            include: [{ model: Medication }]
        });
        if(!user)
            return undefined;
        let userDTO = user.get();
        return userDTO;
    },

    removeMedicationByUser: async (userInfo: UserAttributes, medicationInfo: MedicationAttributes) => {
        let user = await User.findOne({
            where:{
                id: userInfo.id,
            },
            include: [{ model: Medication }]
        });
        if(!user)
            return undefined;
        User.sequelize?.query("DELETE FROM usermedication WHERE userid = :userId AND medicationid = :medicationId", {
            replacements: {
                userId: userInfo.id,
                medicationId: medicationInfo.id
            }
        });
    }
}