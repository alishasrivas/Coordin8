import { AppControllerComponent } from "./components/AppControllerComponent/AppControllerComponent.js";
import { MeetingRepositoryFactory } from "./services/MeetingRepositoryFactory.js";
import { LogInComponent } from "./components/LogInComponent/LogInComponent.js";
import { SignUpComponent } from "./components/SignUpComponent/SignUpComponent.js";

// Create an instance of AppControllerComponent
export const mainMeetingRepository = MeetingRepositoryFactory.get("local");

const appController = new AppControllerComponent();

// Render the component in the #app container
const appContainer = document.getElementById("app");
appContainer.appendChild(appController.render());
const meetingRepository = MeetingRepositoryFactory.get("remote");

// Services
// const mockUser = {
//   username: "mockUser",
//   email: "mockUser@example.com",
//   primary_tz: "UTC",
//   secondary_tz: "UTC+1",
//   email_noti: true
// };

// const mockEvent = [
//   {
//     name: "Event 3",
//     description: "Description for Event 1",
//     times: [
//       { startTime: "10:00 AM", endTime: "11:00 AM", date: "2023-10-01" }
//     ],
//     invitees: ["Alice", "Bob", "Charlie"]
//   },
//   {
//     name: "Event 2",
//     description: "Description for Event 2",
//     times: [
//       { startTime: "02:00 PM", endTime: "03:00 PM", date: "2024-11-30" }
//     ],
//     invitees: ["David", "Eve", "Frank"]
//   },
//   {
//     name: "Event 1",
//     description: "Description for Event 3",
//     times: [
//       { startTime: "09:00 AM", endTime: "10:00 AM", date: "2024-12-03" }
//     ],
//     invitees: ["Grace", "Heidi", "Ivan"]
//   }
// ];

// // Set up with mock user since we don't implement authentication functionalities for this milestone
// async function setUpDataBase() {
//   try {
//     if (!mainMeetingRepository.db) {
//       await mainMeetingRepository.initDB();
//     }

//     const user = await mainMeetingRepository.getUserData();
//     if (user) {
//       console.log('User already exists, no need to create a new one');
//     } else {
//       await mainMeetingRepository.storeUser(mockUser);
//     }

//     const meetings = await mainMeetingRepository.loadMeetingsFromDB();
//     if (meetings.length > 0) {
//       console.log('Meetings already exist, no need to create new ones');
//     } else {
//       for (const event of mockEvent) {
//         await mainMeetingRepository.storeMeeting(event);
//       }
//       console.log('Mock events stored successfully');
//     }
//   } catch (error) {
//     console.error('Error setting up database:', error);
//   }
// }

// setUpDataBase();