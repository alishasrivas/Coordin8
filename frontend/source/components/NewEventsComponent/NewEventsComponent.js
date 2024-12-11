import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { RepositoryRemoteService } from "../../services/RepositoryRemoteService.js";

export class NewEventsComponent extends BaseComponent {
    #newEvents = [];
    #container = null;
    #repositoryRemoteService = new RepositoryRemoteService();

    constructor() {
        super();
        this.loadCSS("NewEventsComponent");
    }

    async initialize() {
        await this.#loadEvents();
    }

    async #loadEvents() {
        try {
            //fetch new (status: null) events
            const newEvents = await this.#repositoryRemoteService.getNewEvents();
            console.log("!!!!!!!!!!!!!reached loadEvents!!!!!!!!!!!!!!");
            console.log(this.#newEvents);
            this.#onLoadEvents(newEvents);
        } catch (error) {
            console.error("Error loading events:", error);
        }
    }

    #onLoadEvents(events) {
        console.log("!!!!!!!!!!!!!reached onLoadEvents!!!!!!!!!!!!!!");
        console.log(this.#newEvents);
        this.#newEvents = events;
        this.#updateContainerContent();
    }

    #getTemplate() {
        return `
            <div id="blue-header">
                <h1>New Events</h1>
            </div>
            <div id="new-events-body">
                <div class="event-section">
                    <h2>Select your attendence for events</h2>
                    <ul id="new-events-list" class="event-list"></ul>
                </div>
            </div>
        `;
    }

    #createContainer() {
        this.#container = document.createElement('div');
        this.#container.classList.add('new-events-container');
        this.#container.innerHTML = this.#getTemplate();
        this.#addEvents();
    }

    #updateContainerContent() {
        if(!this.#container) {
            this.#createContainer();
        }
        this.#container.innerHTML = this.#getTemplate();
        this.#addEvents();
    }

    #addEvents() {
        const newEventList = this.#container.querySelector("#new-events-list");
        if(!newEventList) {
            console.error("New events list not found");
            return;
        }
        for(let i = 0; i < this.#newEvents.length; i++){
            const event = this.#newEvents[i];
            const listItem = document.createElement("li");
            listItem.classList.add("event-item");
            listItem.innerHTML = `
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p>date: ${event.event_time[0].date} | starts: ${event.event_time[0].startTime} | ends: ${event.event_time[0].endTime}</p>
            `;
            const acceptButton = document.createElement("button");
            acceptButton.textContent = "accept";
            acceptButton.onclick = () => {
                this.#repositoryRemoteService.finalizeParticipation(event.event_id, true);
                this.#updateContainerContent();
            }
            listItem.appendChild(acceptButton);
            const rejectButton = document.createElement("button");
            rejectButton.textContent = "reject";
            rejectButton.onclick = () => {
                this.#repositoryRemoteService.finalizeParticipation(event.event_id, false);
                this.#updateContainerContent();
            }
            listItem.appendChild(rejectButton);
        }
    }

    render() {
        if(this.#container) {
            this.#updateContainerContent();
            this.initialize();
            return this.#container;
        }
        this.#createContainer();
        this.initialize();
        return this.#container;
    }
}