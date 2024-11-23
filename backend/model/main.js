//Define realtionship between different models here
import { UserModel } from "./User.js";
import { dbInstance } from "./database.js";

export const UserInstance = UserModel(dbInstance)
//add more models definition of models here
//add relationships here

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