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
    const existingInvitee1 = await UserInstance.findOne({
      where: { email: "invitee1@gmail.com" },
    });
    const existingInvitee2 = await UserInstance.findOne({
      where: { email: "invitee2@gmail.com" },
    });
    const existingInvitee3 = await UserInstance.findOne({
      where: { email: "invitee3@gmail.com" },
    });

    let invitee1, invitee2, invitee3;

    if (!existingInvitee1) {
      invitee1 = await UserInstance.create({
        email: "invitee1@gmail.com",
        username: "Invitee1",
        password: await bcrypt.hash("password123", 10),
        primary_time_zone: "Russia/Moscow",
      });
    } else {
      invitee1 = existingInvitee1;
    }

    if (!existingInvitee2) {
      invitee2 = await UserInstance.create({
        email: "invitee2@gmail.com",
        username: "Invitee2",
        password: await bcrypt.hash("password123", 10),
        primary_time_zone: "America/New_York",
      });
    } else {
      invitee2 = existingInvitee2;
    }

    if (!existingInvitee3) {
      invitee3 = await UserInstance.create({
        email: "invitee3@gmail.com",
        username: "Invitee3",
        password: await bcrypt.hash("password123", 10),
        primary_time_zone: "America/Los_Angeles",
      });
    } else {
      invitee3 = existingInvitee3;
    }

    // Check if events already exist
    const existingEvent1 = await EventInstance.findOne({
      where: { title: "study session today" },
    });
    const existingEvent2 = await EventInstance.findOne({
      where: { title: "study session tomorrow" },
    });
    const existingEvent3 = await EventInstance.findOne({
      where: { title: "study session tomorrow of tomorrow" },
    });

    let event1, event2, event3;

    if (!existingEvent1) {
      event1 = await EventInstance.create({
        title: "study session today",
        description: "we will code",
        event_time: [
          { startTime: "10:20", endTime: "11:00", date: "2025-10-20" },
        ],
        organizer_id: invitee1.user_id,
        invitees: ["invite2@gmail.com", "invite3@gmail.com"],
      });
    } else {
      event1 = existingEvent1;
    }

    if (!existingEvent2) {
      event2 = await EventInstance.create({
        title: "study session tomorrow",
        description: "we will code",
        event_time: [
          { startTime: "10:20", endTime: "11:00", date: "2025-10-21" },
        ],
        organizer_id: invitee2.user_id,
        invitees: ["invite1@gmail.com", "invite3@gmail.com"],
      });
    } else {
      event2 = existingEvent2;
    }

    if (!existingEvent3) {
      event3 = await EventInstance.create({
        title: "study session tomorrow of tomorrow",
        description: "we will code",
        event_time: [
          { startTime: "10:20", endTime: "11:00", date: "2025-10-22" },
        ],
        organizer_id: invitee1.user_id,
        invitees: ["invite1@gmail.com", "invite2@gmail.com"],
      });
    } else {
      event3 = existingEvent3;
    }

    await EventParticipantInstance.create({
      event_id: event1.event_id,
      user_id: invitee2.user_id,
      status: true,
    });

    await EventParticipantInstance.create({
      event_id: event1.event_id,
      user_id: invitee3.user_id,
      status: true,
    });

    await EventParticipantInstance.create({
      event_id: event2.event_id,
      user_id: invitee1.user_id,
      status: true,
    });

    await EventParticipantInstance.create({
      event_id: event2.event_id,
      user_id: invitee3.user_id,
      status: true,
    });

    await EventParticipantInstance.create({
      event_id: event3.event_id,
      user_id: invitee1.user_id,
      status: true,
    });

    await EventParticipantInstance.create({
      event_id: event3.event_id,
      user_id: invitee2.user_id,
      status: true,
    });
  } catch (err) {
    console.log("Error at testing database: ", err);
  }
}

initializeDatabase();
