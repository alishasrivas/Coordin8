import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class AvailabilityComponent extends BaseComponent {
    #container = null;
    #potentialTimes = []; //{startTime, endTime, date} // need to get from indexedDB
    #eventName = ""; // need to get from indexedDB
    #eventDescription = ""; // need to get from indexedDB

    constructor() {
        super();
        this.loadCSS("AvailabilityComponent");
    }

    render() {
        if(this.#container){
            return this.#container;
        }

        this.#createContainer();
        this.#attachEventListeners();
        (async () => {let permission = await Notification.requestPermission();})();
        return this.#container;
    }

    #createContainer() {
        // Create and configure the container element
        this.#container = document.createElement("div");
        this.#container.classList.add("availability-input-container");
        this.#getEventDetails();
        this.#container.innerHTML = this.#getTemplate();
        this.#addTimes();
    }

    #getEventDetails() {
        // get event details from db
        // test data:
        this.#eventName = "sample name";
        this.#eventDescription = "sample sample sample sample sample"
        this.#potentialTimes.push({startTime: "01:00", endTime: "02:00", date: "1970-01-01"});
        this.#potentialTimes.push({startTime: "02:00", endTime: "03:00", date: "1970-01-01"});
    }

    #getTemplate() {
        // Returns the HTML template for the component
        return `
            <div id="blue-header">
                <h1>Submit Available Times</h1>
            </div>

            <div id="availability-input-body">
                <h2>Event Details</h2>
                <h3 id="eventName"></h3>

                <h3 id="eventDescription"></h3>

                <h2>Select Available Times</h2>
                <div id="time-list"></div>

            </div>

            <button id="availability-submit-button">Submit times</button>
        `;
    }

    #addTimes() {
        // add potential times as check boxes
        const eventNameElem = this.#container.querySelector("#eventName");
        eventNameElem.innerHTML = this.#eventName;
        const eventDescriptionElem = this.#container.querySelector("#eventDescription");
        eventDescriptionElem.innerHTML = this.#eventDescription;
        const timeList = this.#container.querySelector("#time-list");
        for(let i = 0; i < this.#potentialTimes.length; i++) {
            const timeContainer = document.createElement("div");
            timeContainer.id = "time" + i;
            timeContainer.innerHTML = `
                <input type="checkbox" id="t${i}" class="time-input" name="t${i}" value="t${i}">
                <label for="t${i}">${this.#potentialTimes[i].date}: ${this.#potentialTimes[i].startTime} - ${this.#potentialTimes[i].startTime}</label>
            `;
        }
    }

    #attachEventListeners() {
        // Attach event listeners to the input and button elements
        const submitTimesBtn = this.#container.querySelector("#availability-submit-button");
        submitTimesBtn.addEventListener("click", () => this.#handleUserSubmission());

        //subscribe to NewMeeting event
        const hub = EventHub.getInstance();
        hub.subscribe('NewMeeting', (meetingData) => this.#sendInviteeNotification(meetingData));
    }

    #handleUserSubmission() {
        // check which potential times the user selected
        const confirmedTimes = [];
        for(let i = 0; i < this.#potentialTimes.length; i++) {
            if(this.#container.querySelector("#t" + i).checked) confirmedTimes.push(this.#potentialTimes[i]);
        }
        this.#publishAvailableTimes(confirmedTimes);
    }

    #publishAvailableTimes(times) {
        const hub = EventHub.getInstance();
        hub.publish(Events.UserAvailabilitySubmission, times);
    }

    #sendInviteeNotification(meetingData) {
        const invited = new Notification("you have been invited to " + meetingData.name);
    }
}