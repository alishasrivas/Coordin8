import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { LogInComponent } from "../LogInComponent/LogInComponent.js";
import { SignUpComponent } from "../SignUpComponent/SignUpComponent.js";
import { AppControllerComponent } from "../AppControllerComponent/AppControllerComponent.js";
import { Events } from "../../eventhub/Events.js";
import { EventHub } from "../../eventhub/EventHub.js";
export class centralNavigationComponent extends BaseComponent {
    #container = null
    #currentPage = 'LogIn'
    #hub = null
    #logInComponent = null
    #appControllerComponent = null
    #signUpComponent = null

    constructor() {
        super();
        this.loadCSS('CentralNavigationComponent')
        this.#hub = EventHub.getInstance();
        this.#appControllerComponent = new AppControllerComponent();
        this.#logInComponent = new LogInComponent();
        this.#signUpComponent = new SignUpComponent();
    }

    render() {
        this.#createContainer();
        this.#setUpContainerContent();
        this.#attachEventLitseners();
        return this.#container;
    }


    #createContainer() {
        this.#container = document.createElement("div");
        this.#container.classList.add('central-nav-container');
    }

    #setUpContainerContent() {
        this.#container.innerHTML = ''

        switch (this.#currentPage) {
            case 'LogIn':
                this.#container.append(this.#logInComponent.render())
                break;
            case 'HomePage':
                this.#container.append(this.#appControllerComponent.render())
                break;
            case 'SignUp':
                this.#container.append(this.#signUpComponent.render())
                break;
        }
    }

    #switchView(page) {
        this.#currentPage = page;
        this.#setUpContainerContent();
    }

    #attachEventLitseners() {
        this.#hub.subscribe(Events.LogInSuccess, () => this.#switchView('HomePage'));
        this.#hub.subscribe(Events.LogOutSuccess, () => this.#switchView('LogIn'));
        this.#hub.subscribe(Events.RegisterToLogIn, () => this.#switchView('LogIn'));
        this.#hub.subscribe(Events.LogInToRegister, () => this.#switchView('SignUp'));
    }
}