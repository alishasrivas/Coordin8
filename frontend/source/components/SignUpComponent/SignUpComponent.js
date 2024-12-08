import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
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
            <p class = 'login_route'>Already have an account? <button type="text" class="login_route_btn">Log In</button></p>

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
                        <label for="username">Username:</label>
                        <input type="text" id="username">
                    </div>
                    <div class="inner_input">
                        <label for="primary_time_zone">Primary Time Zone:</label>
                        <input type="text" id="primary_time_zone">
                    </div>
                    <div class="inner_input toggle">
                        <label for="noti_pref">Email Notification:</label>
                        <input type="checkbox" id="noti_pref">
                    </div>

                </div>
            </form>
            <button type="submit" class="submit-button">Sign Up</button>
        `
    }

    #attachEventListeners() {
        //Add logic for event litseners right here
        const email = this.#container.querySelector('#email');
        const password = this.#container.querySelector('#password');
        const username = this.#container.querySelector('#username');
        const primary_time_zone = this.#container.querySelector('#primary_time_zone');
        const noti_pref = this.#container.querySelector('#noti_pref');
        const submitBtn = this.#container.querySelector('.submit-button');

        submitBtn.addEventListener('click', (event) => {
            event.preventDefault();
            this.#handleSubmit({ email, password, username, primary_time_zone, noti_pref });
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

    #handleSubmit(data) {
        //TODO: add validation for all fields
        const { email, password, username, primary_time_zone, noti_pref } = data
        this.#hub.publish(Events.Register, { email: email.value, password: password.value, username: username.value, primary_time_zone: primary_time_zone.value, noti_pref: noti_pref.checked });
    }
}