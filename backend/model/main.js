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

//Testing database

try {
  console.log("Testing database");
  await synDatabase();

  // const user = await UserInstance.findAll();
  // console.log(user.map(u => u.dataValues));

  // const updatedRow = await UserInstance.update({ primary_time_zone: "Russia/Saint Petesrburg", secondary_time_zone: "Russia/ Moscow", notificationPreferences: false }, { where: { email: "test2@gmail.com" } });
  // console.log(updatedRow); //updateRows will reflect how many rows are updated

  //     const deletedRows = await UserInstance.destroy({ where: { email: "test2@gmail.com" } });
  //     const user = await UserInstance.findOne({ where: { email: "test2@gmail.com" } });
  //     console.log(user.toJSON() ? user : "No user found");

  const invitee1 = await UserInstance.create({
    email: "invitee1@gmail.com",
    username: "Invitee1",
    password: await bcrypt.hash("password123", 10),
    primary_time_zone: "Russia/ Moscow"
  });

  const invitee2 = await UserInstance.create({
    email: "invitee2@gmai.com",
    username: "Invitee2",
    password: await bcrypt.hash("password123", 10),
    primary_time_zone: "AMerica/New_York"
  });

  const invitee3 = await UserInstance.create({
    email: "invitee3@gmail.com",
    username: "Invitee3",
    password: await bcrypt.hash("password123", 10),
    primary_time_zone: "America/Los_Angeles"
  });

  const event1 = await EventInstance.create({
    title: "Event1",
    description: "Event1 Description",
    event_time: new Date(),
    organizer_id: invitee3.user_id,
  });

  const event2 = await EventInstance.create({
    title: "Event2",
    description: "Event2 Description",
    event_time: new Date(),
    organizer_id: invitee3.user_id,

  });

  const eventParticipant1_1 = await EventParticipantInstance.create({
    event_id: event1.event_id,
    user_id: invitee1.user_id,
    accepted: true,
  });

  const eventParticipant2_1 = await EventParticipantInstance.create({
    event_id: event2.event_id,
    user_id: invitee1.user_id,
    accepted: true,
  });

  const eventParticipant2_2 = await EventParticipantInstance.create({
    event_id: event2.event_id,
    user_id: invitee2.user_id,
    accepted: true,
  });

} catch (err) {
  console.log("Error at testing database: ", err);
}
