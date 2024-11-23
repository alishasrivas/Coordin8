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
EventParticipantInstance.belongsTo(UserInstance, { foreignKey: "user_id" });
EventInstance.hasMany(EventParticipantInstance, { foreignKey: "event_id" });
EventParticipantInstance.belongsTo(EventInstance, { foreignKey: "event_id" });

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

synDatabase();