import { AppControllerComponent } from "./components/AppControllerComponent/AppControllerComponent.js";
import { MeetingRepositoryFactory } from "./services/MeetingRepositoryFactory.js";

// Create an instance of AppControllerComponent
const appController = new AppControllerComponent();

// Render the component in the #app container
const appContainer = document.getElementById("app");
appContainer.appendChild(appController.render());

// Services
const meetingRepository = MeetingRepositoryFactory.get("remote");
