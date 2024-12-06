import { BaseComponent } from "../BaseComponent/BaseComponent.js";
//TODO: merge this and the setup account component
export class SignUpComponent extends BaseComponent {
    #container = null;
    #hub = null
    constructor() {
        super();
        this.loadCSS('SignUpComponent');
        this.#hub = EventHub.getInstance();
    }
    #createContainer() {
        // Create and configure the container element
        this.#container = document.createElement("div");
        this.#container.classList.add("sign-up-container");
        this.#container.innerHTML = this.#getTemplate();
    }
    #getTemplate() {
        return `
            <h2>Coordin8</h2>
            <form class="sign-up">
                <h3>We are glad to have you!</h3>
                <div class="input-block">
                    <div class="inner_input">
                        <label for="email">Email:</label>
                        <input type="text" id="email">
                    </div>
                    <div class="inner_input">
                        <label for="password">Password:</label>
                        <input type="password" id="password">
                    </div>
                    <div class="inner_input">
                        <label for="re_password">Retype Password:</label>
                        <input type="password" id="re_password">
                    </div>

                </div>
            </form>
            <button type="submit" class="submit-button">Sign Up</button>
        `
    }
    #attachEventListeners() {
        //Add logic for event litseners right here
        //TODO
    }
    render() {
        if (this.#container) {
            return this.#container;
        }
        this.#createContainer();
        this.#attachEventListeners();
        return this.#container;
    }
}