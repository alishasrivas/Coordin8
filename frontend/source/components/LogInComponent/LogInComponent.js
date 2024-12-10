import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { Events } from "../../eventhub/Events.js";
import { EventHub } from "../../eventhub/EventHub.js";
export class LogInComponent extends BaseComponent {
    #container = null;
    #hub = null
    #BackEndError = ""
    #emailInput = null;
    #passwordInput = null;
    #emailError = "";
    #passwordError = "";
    #isError = false;
    constructor() {
        super();
        this.loadCSS('LogInComponent');
        this.#hub = EventHub.getInstance();
        this.#hub.subscribe(Events.BackEndLogInFailure, (data) => {
            this.#BackEndError = data.message;
            this.#container.innerHTML = this.#getTemplate();
            this.#reassignInput();
            this.#attachEventListeners();
            this.#BackEndError = "";
        })
    }
    #reassignInput() {
        //this function is used to reassign input that user entered before back to the field for them
        this.#container.querySelector("#email").value = this.#emailInput;
        this.#container.querySelector("#password").value = this.#passwordInput;
        this.#emailInput = null;
        this.#passwordInput = null;
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
            <p class = 'register_route'>Don't have an account yet? <button type="text" class="register_route_btn">Register</button></p>
            <form class="log-in">
                <h3>Welcome back!</h3>
                <div class="input-block">
                    <div class="inner_input">
                        <label for="email">Email:</label>
                        <input type="text" id="email">
                        <p class = 'err-msg'>${this.#emailError}</p>
                    </div>
                    <div class="inner_input">
                        <label for="password">Password:</label>
                        <input type="password" id="password">
                        <p class = 'err-msg'>${this.#passwordError}</p>
                    </div>
                </div>
                <p class = 'err-msg big'>${this.#BackEndError}</p>
            </form>
            <button type="submit" class="submit-button-login">Log In</button>
        `
    }
    #attachEventListeners() {
        //Add logic for event litseners right here
        const email = this.#container.querySelector('#email');
        const password = this.#container.querySelector('#password');
        const submitButton = this.#container.querySelector('.submit-button-login');
        const reRouteBtn = this.#container.querySelector('.register_route_btn');
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.#handleSubmit({ email, password });
        })
        reRouteBtn.addEventListener('click', (event) => {
            event.preventDefault();
            this.#hub.publish(Events.LogInToRegister);
        })
    }


    #handleSubmit(data) {
        const { email, password } = data
        this.#emailInput = email.value;
        this.#passwordInput = password.value;

        if (email.value.trim() === "") {
            this.#emailError = "Email cannot be empty"
            this.#isError = true;
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            this.#emailError = "Please enter a valid email address";
            this.#isError = true;
        }
        if (password.value.trim() === "") {
            this.#passwordError = "Password cannot be empty";
            this.#isError = true;
        }

        if (this.#isError) {
            this.#rerenderHTML();
            //reset front end error message so later call won't affect
            this.#emailError = "";
            this.#passwordError = "";
            this.#isError = false;
            return;
        }


        this.#hub.publish(Events.LogIn, { email: email.value, password: password.value });
    }

    #rerenderHTML() {
        this.#container.innerHTML = this.#getTemplate();
        this.#reassignInput();
        this.#attachEventListeners();
    }

    render() {
        if (this.#container) {
            return this.#container;
        }
        this.#createContainer();
        console.log("Log In Component Rendered");
        return this.#container;
    }
}