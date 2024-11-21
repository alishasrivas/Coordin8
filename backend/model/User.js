// import { Sequelize, DataTypes } from "sequelize";
import { Sequelize, DataTypes } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';


// Define the User model

export function UserModel(sequelize) {
    User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        notificationPreferences: { type: DataTypes.BOOLEAN }, // true for yes and false for no
        primary_time_zone: { type: DataTypes.STRING, allowNull: false },
        secondary_time_zone: { type: DataTypes.STRING },
    }, {
        timestamps: true, // Enable timestamps for createdAt and updatedAt
    },);
    return User
}

