import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { mainMeetingRepository } from "../../main.js";
export class ProfileSettingComponent extends BaseComponent {
    #container = null;
    #hub = null;
    #ErrorName = ""
    #ErrorEmail = "";
    #ErrorPrimaryTZ = "";
    #ErrorSecondaryTZ = "";
    #isError = false

    #username = ""
    #email = ""
    #primary_tz = ""
    #secondary_tz = ""
    #default_email_noti = null
    #loading = false
    constructor() {
        super();
        this.loadCSS('ProfileSettingComponent');
        //initialize the event litsener for submission and fetching for the components
        this.#hub = EventHub.getInstance();
    }
    render() {
        if (this.#container) {
            return this.#container;
        }
        this.#createContainer();
        return this.#container;
    }
    #createContainer() {
        // Create and configure the container element
        // this.#loading = true;
        this.#container = document.createElement("div");
        this.#container.classList.add("profile-container");
        this.#fetchUserData().then((userData) => { console.log(userData) }).catch((error) => { console.error(error) }).finally(() => { this.#loading = false; });
        while (this.#loading) {
            //block the page until the loading is done
        }
        this.#container.innerHTML = this.#getTemplate();
        this.#attachEventListeners();
    };

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
                            <input type="text" name="username" id="name" value = ${this.#username}>
                            <input type="text" name="email" id="email" value = ${this.#email}>
                            <p class = 'err-msg'>${this.#ErrorName}</p>
                            <p class = 'err-msg'>${this.#ErrorEmail}</p>
                        </div>
                </div>
                <div class="input-block">
                    <h3>Time Zone Settings:</h3>
                    <div class="inner-input">
                        <label for="primary-time-zone">Primary Time Zone:</label>
                        <label for="secondary-time-zone">Secondary Time Zone:</label>
                        <input type="text" id="primary-time-zone" name="primary_tz" value = ${this.#primary_tz}>
                        <input type="text" id="secondary-time-zone" name="secondary_tz" value = ${this.#secondary_tz}>
                        <p class = 'err-msg'>${this.#ErrorPrimaryTZ}</p>
                        <p class = 'err-msg'>${this.#ErrorSecondaryTZ}</p>
                    </div>
                </div>
                <div class="noti-block">
                    <h3>Notification Preferences</h3>
                    <div class="inner-noti">
                        <p>Email Notifications: </p>
                        <label class="switch">
                            <input type="checkbox" id = "noti_pref" checked = ${this.#default_email_noti} >
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
        submit_button.addEventListener("click", (event) => {
            event.preventDefault();
            this.#handleSubmitData(data)
        })
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
            this.#publishUpdateData({ username: username.value, email: email.value, primary_tz: primary_tz.value, secondary_tz: secondary_tz.value, email_noti: email_noti.checked });
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

    async #fetchUserData() {
        const userData = await mainMeetingRepository.getUserData();
        console.log("Finish fetching data")
        this.#username = userData.username;
        this.#email = userData.email;
        this.#primary_tz = userData.primary_tz;
        this.#secondary_tz = userData.secondary_tz;
        this.#default_email_noti = userData.email_noti;
        return userData;
    }

}