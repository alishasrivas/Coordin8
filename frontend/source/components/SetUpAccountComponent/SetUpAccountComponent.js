import { BaseComponent } from "../BaseComponent/BaseComponent";

export class LogOutComponent extends BaseComponent {
    #container = null;
    #hub = null
    constructor() {
        super();
        this.loadCSS('LogOutComponent');
        this.#hub = EventHub.getInstance();
    }
    #createContainer() {
        // Create and configure the container element
        this.#container = document.createElement("div");
        this.#container.classList.add("log-out-container");
        this.#container.innerHTML = this.#getTemplate();
    }
    #getTemplate() {
        return `
            <h2>Coordin8</h2>
            <form class="set-up">
                <h3>Please finish the information to set up your account</h3>
                <div class="input-block">
                    <div class="inner_input">
                        <label for="username">Username:</label>
                        <input type="text" id="username">
                    </div>
                    <div class="inner_input">
                        <label for="primary_time_zone">Primary Time Zone:</label>
                        <input type="text" id="primary_time_zone">
                    </div>
                    <div class="inner_input">
                        <label for="noti_pref">Email Notification:</label>
                        <label class="switch">
                            <input type="checkbox" id="noti_pref">
                            <span class="slider round"></span>
                        </label>
                    </div>

                </div>
            </form>
            <button type="submit" class="submit-button">Finish</button>       
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