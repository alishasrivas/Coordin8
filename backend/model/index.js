//Define realtionship between different models here
import { UserModel } from "./user";
import { dbInstance } from "./database";

const User = UserModel(dbInstance)
//add more models here
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