import { AppControllerComponent } from "./components/AppControllerComponent/AppControllerComponent.js";
import { MeetingRepositoryFactory } from "./services/MeetingRepositoryFactory.js";

// Create an instance of AppControllerComponent
export const mainMeetingRepository = MeetingRepositoryFactory.get("local");
const appController = new AppControllerComponent();

// Render the component in the #app container
const appContainer = document.getElementById("app");
appContainer.appendChild(appController.render());
const meetingRepository = MeetingRepositoryFactory.get("remote");

// Services
const mockUser = { username: 'mockUser', 'email': 'example@gmail.com', 'primary_tz': 'America/New_York', 'secondary_tz': 'America/Los_Angeles', email_noti: false };
const mockEvent = [
    {
        name: "Event 1",
        description: "Description for Event 1",
        times: [
            { startTime: "10:00 AM", endTime: "11:00 AM", date: "2023-10-01" }
        ],
        invitees: ["Alice", "Bob", "Charlie"]
    },
    {
        name: "Event 2",
        description: "Description for Event 2",
        times: [
            { startTime: "02:00 PM", endTime: "03:00 PM", date: "2023-10-02" }
        ],
        invitees: ["David", "Eve", "Frank"]
    },
    {
        name: "Event 3",
        description: "Description for Event 3",
        times: [
            { startTime: "09:00 AM", endTime: "10:00 AM", date: "2023-10-03" }
        ],
        invitees: ["Grace", "Heidi", "Ivan"]
    }
];

//set up with mock user since we don't implement authentication functionalities for this milestone
async function setUpDataBase() {
    if (!mainMeetingRepository.db) {
        await mainMeetingRepository.initDB();
    }
    const res = await mainMeetingRepository.getUserData();
    if (res) {
        console.log('User already exists, no need to create a new one');
    }
    else {

        await mainMeetingRepository.storeUser(mockUser);
    }

    const res2 = await mainMeetingRepository.loadMeetingsFromDB();
    if (res2.length > 4) {
        console.log('Meetings already exists, no need to create a new one');
    }
    else {
        for (let i = 0; i < mockEvent.length; i++) {
            console.log(i);
            await mainMeetingRepository.storeMeeting(mockEvent[i]);
        }

    }
}

setUpDataBase();