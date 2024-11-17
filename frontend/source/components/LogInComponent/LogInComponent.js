import { BaseComponent } from "../BaseComponent/BaseComponent";

export class LogInComponent extends BaseComponent {
    #container = null;
    #hub = null
    constructor() {
        super();
        this.loadCSS('LogInComponent');
        this.#hub = EventHub.getInstance();
    }
    #createContainer() {
        // Create and configure the container element
        this.#container = document.createElement("div");
        this.#container.classList.add("log-in-container");
        this.#container.innerHTML = this.#getTemplate();
    }
    #getTemplate() {
        return `
            <h2>Coordin8</h2>
            <form class="log-in">
                <h3>Welcome back!</h3>
                <div class="input-block">
                    <div class="inner_input">
                        <label for="email">Email:</label>
                        <input type="text" id="email">
                    </div>
                    <div class="inner_input">
                        <label for="password">Password:</label>
                        <input type="password" id="password">
                    </div>
                </div>
            </form>
            <button type="submit" class="submit-button">Log In</button>
        `
    }
    #attachEventListeners() {
        //Add logic for event litseners right here
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