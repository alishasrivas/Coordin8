//Define relationship between different models here
import { UserModel } from "./User.js";
import { dbInstance } from "./database.js";
import { EventsModel } from "./Event.js";
import { EventParticipantModel } from "./EventParticipant.js";
import bcrypt from "bcryptjs";

export const UserInstance = UserModel(dbInstance);
export const EventInstance = EventsModel(dbInstance);
export const EventParticipantInstance = EventParticipantModel(dbInstance);
//add more models definition of models here
//add relationships here
UserInstance.hasMany(EventParticipantInstance, { foreignKey: "user_id" });
EventParticipantInstance.belongsTo(UserInstance, { foreignKey: "user_id" });
EventInstance.hasMany(EventParticipantInstance, { foreignKey: "event_id" });
EventParticipantInstance.belongsTo(EventInstance, { foreignKey: "event_id" });

//define organizer relationship, every event must have an organizer but not every user is an organizer
//!Recheck if this is correct
UserInstance.hasMany(EventInstance, {
  foreignKey: "organizer_id",
  allowNull: false,
  as: "events",
});
EventInstance.belongsTo(UserInstance, {
  foreignKey: "organizer_id",
  allowNull: false,
  as: "organizer",
});

//sync database
async function synDatabase() {
  try {
    await dbInstance.sync({ alter: true });
  } catch (err) {
    console.log(`Error at syncDatabase:`, err);
  }
}

await synDatabase();


async function initializeDatabase() {
  try {
    console.log("Testing database");
    await synDatabase();

    // Check if users already exist
    const existingInvitee1 = await UserInstance.findOne({ where: { email: "invitee1@gmail.com" } });
    const existingInvitee2 = await UserInstance.findOne({ where: { email: "invitee2@gmail.com" } });
    const existingInvitee3 = await UserInstance.findOne({ where: { email: "invitee3@gmail.com" } });

    let invitee1, invitee2, invitee3;

    if (!existingInvitee1) {
      invitee1 = await UserInstance.create({
        email: "invitee1@gmail.com",
        username: "Invitee1",
        password: await bcrypt.hash("password123", 10),
        primary_time_zone: "Russia/Moscow"
      });
    } else {
      invitee1 = existingInvitee1;
    }

    if (!existingInvitee2) {
      invitee2 = await UserInstance.create({
        email: "invitee2@gmail.com",
        username: "Invitee2",
        password: await bcrypt.hash("password123", 10),
        primary_time_zone: "America/New_York"
      });
    } else {
      invitee2 = existingInvitee2;
    }

    if (!existingInvitee3) {
      invitee3 = await UserInstance.create({
        email: "invitee3@gmail.com",
        username: "Invitee3",
        password: await bcrypt.hash("password123", 10),
        primary_time_zone: "America/Los_Angeles"
      });
    } else {
      invitee3 = existingInvitee3;
    }

    // Check if events already exist
    const existingEvent1 = await EventInstance.findOne({ where: { title: "Event1" } });
    const existingEvent2 = await EventInstance.findOne({ where: { title: "Event2" } });

    let event1, event2;

    if (!existingEvent1) {
      event1 = await EventInstance.create({
        title: "Event1",
        description: "Event1 Description",
        event_time: new Date(),
        organizer_id: invitee3.user_id,
      });
    } else {
      event1 = existingEvent1;
    }

    if (!existingEvent2) {
      event2 = await EventInstance.create({
        title: "Event2",
        description: "Event2 Description",
        event_time: new Date(),
        organizer_id: invitee3.user_id,
      });
    } else {
      event2 = existingEvent2;
    }

    await EventParticipantInstance.create({
      event_id: event1.event_id,
      user_id: invitee1.user_id,
      accepted: true,
    });

    await EventParticipantInstance.create({
      event_id: event2.event_id,
      user_id: invitee1.user_id,
      accepted: true,
    });

    await EventParticipantInstance.create({
      event_id: event2.event_id,
      user_id: invitee2.user_id,
      accepted: true,
    });

  } catch (err) {
    console.log("Error at testing database: ", err);
  }
}

initializeDatabase();