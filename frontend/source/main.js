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
const mockUser = { username: 'mockUser', 'email': 'example@gmail.com', 'primaryTimeZone': 'America/New_York', 'secondaryTimeZone': 'America/Los_Angeles' };
//step: use repository to store user, then go to profileSetting to fetch the user
// mainMeetingRepository.storeUser(mockUser);