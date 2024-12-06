//this will contain a function that is responsible for navigating between logIn page, signUp page, and homepage
//this will work in accordance with event hub

import { EventHub } from "../eventhub/EventHub.js";
import { LogInComponent } from "../components/LogInComponent/LogInComponent";
import { AppControllerComponent } from "../components/AppControllerComponent/AppControllerComponent.js";
import { SignUpComponent } from "../components/SignUpComponent/SignUpComponent.js";
import { Events } from "../eventhub/Events.js";

//register to event hub
const hub = EventHub.getInstance();
hub.subscribe(Events.LogInSuccess, () => {
    centralNavigate("Home");
})

hub.subscribe(Events.LogOutSuccess, () => {
    centralNavigate("LogIn");
})


export function centralNavigate(componentType) {
    const rootElement = document.getElementById("app");
    rootElement.innerHTML = "";
    switch (componentType) {
        case "LogIn":
            const logInComponent = new LogInComponent();
            rootElement.appendChild(logInComponent.render());
            break;
        case "SignUp":
            const signUpComponent = new SignUpComponent();
            rootElement.appendChild(signUpComponent.render());
            break;
        case "Home":
            const appController = new AppControllerComponent();
            rootElement.appendChild(appController.render());
            break;
        default:
            console.error("Invalid component name");
    }
}


