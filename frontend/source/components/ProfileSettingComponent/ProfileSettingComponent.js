import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class ProfileSettingComponent extends BaseComponent {
    #container = null;
    #hub = null;
    #ErrorName = ""
    #ErrorEmail = "";
    #ErrorPrimaryTZ = "";
    #ErrorSecondaryTZ = "";
    #isError = false

    constructor() {
        super();
        this.loadCSS('ProfileSettingComponent');
        //initialize the event litsener for submission and fetching for the components
        this.#hub = EventHub.getInstance();
        this.#hub.subscribe(Events.updateProfileSettings, (data) => this.#StoreProfileData(data));
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
                        <label for="name">Name:</label>
                        <label for="email">Email:</label>
                        <input type="text" name="username" id="name">
                        <input type="text" name="email" id="email">
                        <p class = 'err-msg'>${this.#ErrorName}</p>
                        <p class = 'err-msg'>${this.#ErrorEmail}</p>
                    </div>
            </div>
            <div class="input-block">
                <h3>Time Zone Settings:</h3>
                <div class="inner-input">
                    <label for="primary-time-zone">Primary Time Zone:</label>
                    <label for="secondary-time-zone">Secondary Time Zone:</label>
                    <input type="text" id="primary-time-zone" name="primary_tz">
                    <input type="text" id="secondary-time-zone" name="secondary_tz">
                        <p class = 'err-msg'>${this.#ErrorPrimaryTZ}</p>
                        <p class = 'err-msg'>${this.#ErrorSecondaryTZ}</p>
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
        //take all inputs
        //call updateProfileSetting event to publish alongside with these inputs
        //add validation for inputs, just an alart for wrong input would be enough
        //add fetching events to fetch current data to input field
        const username = this.#container.querySelector("#name")
        const email = this.#container.querySelector("#email")
        const primary_tz = this.#container.querySelector("#primary-time-zone")
        const secondary_tz = this.#container.querySelector("#secondary-time-zone")
        const email_noti = this.#container.querySelector("#noti_pref")
        const submit_button = this.#container.querySelector(".submit-button")
        const data = { username, email, primary_tz, secondary_tz, email_noti }
        submit_button.addEventListener("click", () => this.#handleSubmitData(data))
        // hub.publish(Events.updateProfileSettings, { username, email, primary_tz, secondary_tz, email_noti })
    }

    #handleSubmitData(data) {
        const { username, email, primary_tz, secondary_tz, email_noti } = data
        if (username.value.trim() === "") {
            this.#ErrorName = "Please enter name properly"
            this.#isError = true
        }

        if (email.value.trim() === "") {
            this.#ErrorEmail = "Please enter email properly"
            this.#isError = true
        }

        if (primary_tz.value.trim() === "") {
            this.#ErrorPrimaryTZ = "Please enter primary timezone properly"
            this.#isError = true
        }

        if (this.#isError) {
            //show error message
            //rerender
            this.#reRenderHTML();
        }
        else {
            this.#publishUpdateData(data);

        }
    }

    #reRenderHTML() {
        this.#container.innerHTML = this.#getTemplate(); //include any error messages if exist
        this.#isError = false;
        this.#ErrorEmail = "";
        this.#ErrorName = "";
        this.#ErrorPrimaryTZ = "";
        this.#attachEventListeners();
    }

    #publishUpdateData(data) {
        this.#hub.publish(Events.updateProfileSettings, data);
    }

    #StoreProfileData(data) {
        //data type: { username, email, primary_tz, secondary_tz, email_noti }
        //add backend logic to store the data after submission
    }
}