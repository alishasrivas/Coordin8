// import { Sequelize, DataTypes } from "sequelize";
import { Sequelize, DataTypes } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';


// Define the User model
//Some Problems to look into: data type to store the timezone so that later you can easily convert it to the UTC.

export function EventParticipantModel(sequelize) {
    const EventParticipant = sequelize.define("EventParticipant", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        event_time_preference: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        timestamps: true, // Enable timestamps for createdAt and updatedAt
    },);
    return EventParticipant;
}

