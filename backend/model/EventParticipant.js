// import { Sequelize, DataTypes } from "sequelize";
import { Sequelize, DataTypes, sql } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';


// Define the User model
//Some Problems to look into: data type to store the timezone so that later you can easily convert it to the UTC.

export function EventParticipantModel(sequelize) {
    const EventParticipant = sequelize.define("EventParticipant", {
        id: {
            type: DataTypes.UUID.V4,
            defaultValue: sql.uuidV4,
            primaryKey: true,
        },
        event_id: {
            type: DataTypes.UUID.V4,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID.V4,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    }, {
        timestamps: true, // Enable timestamps for createdAt and updatedAt
    },);
    return EventParticipant;
}

