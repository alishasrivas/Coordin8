import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
//TODO: merge this and the setup account component
export class SignUpComponent extends BaseComponent {
    #container = null;
    #hub = null
    #isError = false;
    #emailError = "";
    #passwordError = "";
    #usernameError = "";
    #timeZoneError = "";
    #userInnput = { email: null, password: null, username: null, primary_time_zone: null };
    #BackEndError = "";

    constructor() {
        super();
        this.loadCSS('SignUpComponent');
        this.#hub = EventHub.getInstance();
        this.#hub.subscribe(Events.RegisterBackEndFailure, (data) => {
            this.#BackEndError = data.message;
            this.#container.innerHTML = this.#getTemplate();
            this.#reassignInput();
            this.#attachEventListeners();
            this.#BackEndError = "";
        })
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
            <p class = 'login_route'>Already have an account? <button type="text" class="login_route_btn">Log In</button></p>

            <form class="sign-up">
                <h3>We are glad to have you!</h3>
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
                    <div class="inner_input">
                        <label for="username">Username:</label>
                        <input type="text" id="username">
                        <p class = 'err-msg'>${this.#usernameError}</p>
                    </div>
                    <div class="inner_input">
                        <label for="primary_time_zone">Primary Time Zone:</label>
                        <input type="text" id="primary_time_zone">
                        <p class = 'err-msg'>${this.#timeZoneError}</p>
                    </div>
                </div>
                <p class = 'err-msg big'>${this.#BackEndError}</p>

            </form>
            <button type="submit" class="submit-button">Sign Up</button>
        `
    }

    #resetUserInput() {
        this.#userInnput = { email: null, password: null, username: null, primary_time_zone: null }
    }

    #attachEventListeners() {
        //Add logic for event litseners right here
        const email = this.#container.querySelector('#email');
        const password = this.#container.querySelector('#password');
        const username = this.#container.querySelector('#username');
        const primary_time_zone = this.#container.querySelector('#primary_time_zone');
        const submitBtn = this.#container.querySelector('.submit-button');
        submitBtn.addEventListener('click', (event) => {
            event.preventDefault();
            this.#handleSubmit({ email, password, username, primary_time_zone });
        })
        const reRouteBtn = this.#container.querySelector('.login_route_btn');
        console.log(reRouteBtn)
        reRouteBtn.addEventListener('click', (event) => {
            event.preventDefault();
            this.#hub.publish(Events.RegisterToLogIn);
        })
    }
    render() {
        if (this.#container) {
            return this.#container;
        }
        this.#createContainer();
        this.#attachEventListeners();
        return this.#container;
    }

    #reassignInput() {
        this.#container.querySelector("#email").value = this.#userInnput.email;
        this.#container.querySelector("#password").value = this.#userInnput.password;
        this.#container.querySelector("#username").value = this.#userInnput.username;
        this.#container.querySelector("#primary_time_zone").value = this.#userInnput.primary_time_zone;
        this.#resetUserInput();
    }

    #handleSubmit(data) {
        const { email, password, username, primary_time_zone } = data
        this.#userInnput = { email: email.value, password: password.value, username: username.value, primary_time_zone: primary_time_zone.value }
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

        if (username.value.trim() === "") {
            this.#usernameError = "Username cannot be empty";
            this.#isError = true;
        }

        if (primary_time_zone.value.trim() === "") {
            this.#timeZoneError = "Primary Time Zone cannot be empty";
            this.#isError = true;
        }

        if (this.#isError) {
            this.#rerenderHTML();
            this.#isError = false;
            this.#emailError = "";
            this.#passwordError = "";
            this.#usernameError = "";
            this.#timeZoneError = "";
            return;
        }

        this.#hub.publish(Events.Register, { email: email.value, password: password.value, username: username.value, primary_time_zone: primary_time_zone.value });
    }

    #rerenderHTML() {
        this.#container.innerHTML = this.#getTemplate();
        this.#reassignInput();
        this.#attachEventListeners();
    }

}