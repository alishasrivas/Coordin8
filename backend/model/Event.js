// import { Sequelize, DataTypes } from "sequelize";
import { Sequelize, DataTypes, sql } from "@sequelize/core";
import { SqliteDialect } from "@sequelize/sqlite3";

// Define the User model
//Some Problems to look into: data type to store the timezone so that later you can easily convert it to the UTC.

export function EventsModel(sequelize) {
  const Events = sequelize.define(
    "Events",
    {
      event_id: {
        type: DataTypes.UUID.V4,
        defaultValue: sql.uuidV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      invitees: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      event_time: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      organizer_id: {
        type: DataTypes.UUID.V4,
        allowNull: false,
      },

    },
    {
      timestamps: true, // Enable timestamps for createdAt and updatedAt
    }
  );
  return Events;
}
