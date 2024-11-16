import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class EventCreationComponent extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('ProfileSettingComponent');
        //initialize the event litsener for submission and fetching for the components
        const hub = EventHub.getInstance();
        hub.subcribe(Events.updateProfileSettings, (data) => this.#StoreProfileData(data));
    }

    render() {
        if (this.#container) {
            return this.#container;
        }

        this.#createContainer();
        this.#attachEventListeners();
        return this.#container;
    }

    #createContainer() {
        // Create and configure the container element
        this.#container = document.createElement("div");
        this.#container.classList.add("profile-container");
        this.#container.innerHTML = this.#getTemplate();
    }

    #getTemplate() {
        // Returns the HTML template for the component
        return `
        <div class="header">
            <h3>Profile Settings</h1>
        </div>

        <form>
            <div class="input-block"> 
                <h3>Personal Information</h1>
                    <div class="inner-input">
                        <label for="username">Name:</label>
                        <label for="email">Email:</label>
                        <input type="text" name="username" id="name">
                        <input type="text" name="email" id="email">
                    </div>
            </div>
            <div class="input-block">
                <h3>Time Zone Settings:</h3>
                <div class="inner-input">
                    <label for="primary-time-zone">Primary Time Zone:</label>
                    <label for="secondary-time-zone">Secondary Time Zone:</label>
                    <input type="text" id="primary-time-zone" name="primary_tz">
                    <input type="text" id="secondary-time-zone" name="secondary_tz">
                </div>
            </div>
            <div class="noti-block">
                <h3>Notification Preferences</h3>

                <div class="inner-noti">
                    <p>Email Notifications: </p>

                    <label class="switch">
                        <input type="checkbox" id = "noti_pref">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div class="footer">
                <button type="submit" class="submit-button">Save</button>
            </div>
        </form>
    `;
    }
    //call though events so other elements call rerender with new data
    #attachEventListeners() {
        const hub = EventHub.getInstance();

        //take all inputs
        //call updateProfileSetting event to publish alongside with these inputs

        //add validation for inputs, just an alart for wrong input would be enough
        //add fetching events to fetch current data to input field

        username = document.querySelector("#name")
        email = document.querySelector("#email")
        primary_tz = document.querySelector("#primary_tz")
        secondary_tz = document.querySelector("#secondary_tz")
        email_noti = document.querySelector("#noti_pref")


        submit_button = document.querySelector(".submit-button")

        const data = { username, email, primary_tz, secondary_tz, email_noti }

        submit_button.addEventLitsener("click", () => this.#handleSubmitData(data))

        // hub.publish(Events.updateProfileSettings, { username, email, primary_tz, secondary_tz, email_noti })
    }

    #handleSubmitData(data) {
        const { username, email, primary_tz, secondary_tz, email_noti } = data
        if (!username) {
            alert("Please enter username")

        }

        if (!email) {
            alert("Please eneter email")
        }

        if (!primary_tz) {
            alert("Please enter primary timezone")
        }

        this.#publishUpdateData(data);

    }

    #publishUpdateData(data) {
        const hub = EventHub.getInstance();
        hub.publish(Events.updateProfileSettings, data);
    }


    #StoreProfileData(data) {
        //data type: { username, email, primary_tz, secondary_tz, email_noti }

        //add backend logic to store the data after submission


    }

}
