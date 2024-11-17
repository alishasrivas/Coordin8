import { AppControllerComponent } from "./components/AppControllerComponent/AppControllerComponent.js";
import { MeetingRepositoryFactory } from "./services/MeetingRepositoryFactory.js";

// Create an instance of AppControllerComponent
const appController = new AppControllerComponent();

// Render the component in the #app container
const appContainer = document.getElementById("app");
appContainer.appendChild(appController.render());

// Services
const meetingRepository = MeetingRepositoryFactory.get("remote");
export const mainMeetingRepository = MeetingRepositoryFactory.get("local");
const mockUser = { username: 'mockUser', 'email': 'example@gmail.com', 'primary_tz': 'America/New_York', 'secondary_tz': 'America/Los_Angeles', email_noti: false };

//set up with mock user since we don't implement authentication functionalities for this milestone
async function setUpDataBase() {
    if (!mainMeetingRepository.db) {
        await mainMeetingRepository.initDB();
    }
    const res = await mainMeetingRepository.getUserData();
    if (res) {
        console.log('User already exists, no need to create a new one');
        return;
    }

    await mainMeetingRepository.storeUser(mockUser);
}

setUpDataBase();