// import { Sequelize, DataTypes } from "sequelize";
import { Sequelize, DataTypes } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';


// Define the User model
//Some Problems to look into: data type to store the timezone so that later you can easily convert it to the UTC.

export function EventsModel(sequelize) {
    const Events = sequelize.define("Events", {
        event_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },
        event_time: {
            type: DataTypes.DATE,
        },
        file_attachment: {
            type: DataTypes.STRING, //TODO: may need to change here
        },
        // organizer_id:{}

    }, {
        timestamps: true, // Enable timestamps for createdAt and updatedAt
    },);
    return Events;
}

