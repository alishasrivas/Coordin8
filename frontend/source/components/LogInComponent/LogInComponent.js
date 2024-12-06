import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { Events } from "../../eventhub/Events.js";
export class LogInComponent extends BaseComponent {
    #container = null;
    #hub = null
    #isError = false
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
        this.#attachEventListeners();
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
        //TODO
        //Add logic for event litseners right here
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const submitButton = document.querySelector('.submit-button');
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.#handleSubmit({ email, password });
        })
    }


    #handleSubmit(data) {
        const { email, password } = data
        //TODO: implement validation for email and password
        this.#hub.publish(Events.LogIn, { email: email.value, password: password.value });
        alert("Log In Sucessful");
    }
    render() {
        if (this.#container) {
            return this.#container;
        }
        this.#createContainer();
        console.log("Log In Component Rendered");
        this.#attachEventListeners();
        return this.#container;
    }
}