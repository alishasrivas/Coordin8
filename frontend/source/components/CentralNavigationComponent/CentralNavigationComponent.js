import { BaseComponent } from "../BaseComponent/BaseComponent";
import { LogInComponent } from "../LogInComponent/LogInComponent";
import { AppControllerComponent } from "../AppControllerComponent/AppControllerComponent";
import { Events } from "../../eventhub/Events";
export class centralNavigationComponent extends BaseComponent {
    #container = null
    #currentPage = 'LogIn'
    #hub = null
    #logInComponent = null
    #appControllerComponent = null

    constructor() {
        super();
        this.loadCSS('CentralNavigationComponent')
        this.#appControllerComponent = new AppControllerComponent();
        this.#logInComponent = new LogInComponent();
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
        }
    }

    #switchView(page) {
        this.#currentPage = page;
        this.#setUpContainerContent();
    }

    #attachEventLitseners() {
        this.#hub.subscribe(Events.LogInSuccess, () => this.#switchView('HomePage'))
        this.#hub.subscribe(Events.LogOutSuccess, () => this.#switchView('LogIn'))
    }
}