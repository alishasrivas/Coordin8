//Define realtionship between different models here
import { UserModel } from "./User.js";
import { dbInstance } from "./database.js";
import { EventsModel } from "./Event.js";
import { EventParticipantModel } from "./EventParticipant.js";
import { InvitationModel } from "./Invitation.js";

export const UserInstance = UserModel(dbInstance);
export const EventInstance = EventsModel(dbInstance);
export const EventParticipantInstance = EventParticipantModel(dbInstance);
export const InvitationInstance = InvitationModel(dbInstance);
//add more models definition of models here
//add relationships here
UserInstance.hasMany(EventParticipantInstance, { foreignKey: "user_id" });
EventParticipantInstance.belongsTo(UserInstance, { foreignKey: "user_id", allowNull: false });
EventInstance.hasMany(EventParticipantInstance, { foreignKey: "event_id" });
EventParticipantInstance.belongsTo(EventInstance, { foreignKey: "event_id", allowNull: false });

//define organizer relationship, every event must have an organizer but not every user is an organizer
//!Recheck if this is correct
UserInstance.hasMany(EventInstance, { foreignKey: "organizer_id", allowNull: false, as: 'events' });
EventInstance.belongsTo(UserInstance, { foreignKey: "organizer_id", allowNull: false, as: 'organizer' });

UserInstance.hasMany(InvitationInstance, { foreignKey: "user_id" });
InvitationInstance.belongsTo(UserInstance, { foreignKey: "user_id" });
EventInstance.hasMany(InvitationInstance, { foreignKey: "event_id" });
InvitationInstance.belongsTo(EventInstance, { foreignKey: "event_id" });
//sync database
async function synDatabase() {
    try {
        await dbInstance.sync();
    }
    catch (err) {
        console.log(`Error at syncDatabase:`, err)
    }
}

// synDatabase();


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

    const event1 = await EventInstance.create({
        title: "testEvent3",
        description: "This is the test event, where I linked this to a user as organizer",
    })

    // // const testFind = await EventInstance.findAll({ where: { organizer_id: "072f5d2e-30d5-4da0-bbea-5f0c7d8c3512" } });
    // // console.log(testFind);

    const user2 = await UserInstance.create({
        username: "tan",
        password: "string",
        email: "tan@gmail.com",
        notificationPreferences: true,
        primary_time_zone: "America/New_York",
        secondary_time_zone: "America/Los_Angeles",
    })
    console.log(user2);


    const getUser = await UserInstance.findOne({ where: { email: "tan@gmail.com" } });
    // await EventParticipantInstance.destroy({ where: { user_id: getUser.user_id } });
    const getEvent = await EventInstance.findOne({ where: { title: "testEvent3" } });

    await EventParticipantInstance.create({
        user_id: getUser.user_id,
        event_id: getEvent.event_id,
        event_time_preference: Date.now(),
    })



}

catch (err) {
    console.log("Error at testing database: ", err)
}