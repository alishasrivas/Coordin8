// import { Sequelize, DataTypes } from "sequelize";
import { Sequelize, DataTypes, sql } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';


// Define the User model
//Some Problems to look into: data type to store the timezone so that later you can easily convert it to the UTC.

export function UserModel(sequelize) {
    const User = sequelize.define("User", {
        user_id: {
            type: DataTypes.UUID.V4,
            defaultValue: sql.uuidV4,
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
    return User;
}

