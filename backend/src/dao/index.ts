import { Optional } from "sequelize";
import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('HealthMe', 'root', 'root', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

export interface UserAttributes {
    id: number;
    username: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }


export class User extends Model<UserAttributes, UserCreationAttributes> { }
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: 'user' });

export interface MedicationAttributes {
    id: number;
    name: string;
    dosageUnits: string;
    dosage: string;
    notes: string
}

interface MedicationCreationAttributes extends Optional<MedicationAttributes, 'id'> { }

export class Medication extends Model<MedicationAttributes, MedicationCreationAttributes> { }
Medication.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    dosageUnits: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dosage: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { sequelize, modelName: 'medication' });

User.belongsToMany(Medication, { through: 'UserMedication' });
Medication.belongsToMany(User, { through: 'UserMedication' });

// (async () => {
//     await sequelize.sync({ force: true });
// })();