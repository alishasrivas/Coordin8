import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { RepositoryRemoteService } from "../../services/RepositoryRemoteService.js";
import { EventHub } from "../../eventhub/EventHub.js";

export class DashboardComponent extends BaseComponent {
  #organizedEvents = [];
  #acceptedEvents = [];
  #container = null;
  #hub = null;

  #repositoryRemoteService = new RepositoryRemoteService();
  constructor() {
    super();
    this.loadCSS("DashboardComponent");
    this.#hub = EventHub.getInstance();
  }

  async initialize() {
    await this.#loadEvents();
  }

  async #loadEvents() {
    try {
      // Fetch organized events
      const organizedEvents =
        await this.#repositoryRemoteService.getOrganizedEvents();
      if (organizedEvents) {
        this.#onFetchOrganizedEvents(organizedEvents);
      } else {
        console.warn("No organized events found.");
      }

      // Fetch accepted events
      const acceptedEvents =
        await this.#repositoryRemoteService.getAcceptedEvents();
      if (acceptedEvents) this.#onFetchAcceptedEvents(acceptedEvents);
      else {
        console.warn("No accepted events found.");
      }
    } catch (error) {
      console.error("Error loading events:", error);
    }
  }

  #onFetchOrganizedEvents(events) {
    this.#organizedEvents = events;
    this.#updateContainerContent();
  }

  #onFetchAcceptedEvents(events) {
    this.#acceptedEvents = events;
    this.#updateContainerContent();
  }

  render() {
    if (this.#container) {
      this.#updateContainerContent();
      return this.#container;
    }
    this.#createContainer();
    return this.#container;
  }

  #updateContainerContent() {
    if (!this.#container) {
      this.#createContainer();
    }
    this.#container.innerHTML = this.#getTemplate();
    this.#addEvents();
  }

  #createContainer() {
    // Create and configure the container element
    this.#container = document.createElement("div");
    this.#container.classList.add("dashboard-container");
    this.#container.innerHTML = this.#getTemplate();
    this.#addEvents();
  }

  #getTemplate() {
    // Returns the HTML template for the component
    return `
      <div id="blue-header">
        <h1>Dashboard</h1>
      </div>
      <div id="dashboard-body">
        <div class="event-section">
          <h2>Organized Events</h2>
          <ul class="event-list" id="organized-events-list"></ul>
        </div>
        <div class="event-section">
          <h2>Accepted Events</h2>
          <ul class="event-list" id="accepted-events-list"></ul>
        </div>
      </div>
    `;
  }

  #addEvents() {
    // Add organized and accepted events to the respective lists
    const organizedEventsList = this.#container.querySelector("#organized-events-list");
    if (!organizedEventsList) {
      console.error("Organized events list element not found");
      return;
    }
    this.#organizedEvents.forEach((event) => {
      const listItem = document.createElement("li");
      listItem.classList.add("event-item");
      listItem.id = event.event_id; // Set a unique ID for the <li>
      listItem.innerHTML = `
        <div class="event-content">
          <div class="event-details">
            <h3>Event title: ${event.title}</h3>
            <p>Description: ${event.description}</p>
            ${event.event_time
              .map(
                (time) => `
              <p>Start Time: ${time.startTime}</p>
              <p>End Time: ${time.endTime}</p>
              <p>Date: ${time.date}</p>
            `
              )
              .join("")}
          </div>
          <div class="event-buttons">
            <button class="delete-event-button" data-event-id="${
              event.event_id
            }">Delete</button>
            <button class="edit-event-button">Edit</button>
          </div>
        </div>
      `;
      organizedEventsList.appendChild(listItem);
    });
    
    const acceptedEventsList = this.#container.querySelector("#accepted-events-list");
    if (!acceptedEventsList) {
      console.error("Accepted events list element not found");
      return;
    }
    this.#acceptedEvents.forEach((event) => {
      const listItem = document.createElement("li");
      listItem.classList.add("event-item");
      listItem.innerHTML = `
        <div class="event-content">
          <div class="event-details">
            <h3>Event title: ${event.title}</h3>
            <p>Description: ${event.description}</p>
            ${event.event_time
              .map(
                (time) => `
              <p>Start Time: ${time.startTime}</p>
              <p>End Time: ${time.endTime}</p>
              <p>Date: ${time.date}</p>
            `
              )
              .join("")}
          </div>
          <div class="event-buttons">
            <button class="delete-event-button">Delete</button>
            <button class="edit-event-button">Edit</button>
          </div>
        </div>
      `;
      listItem
        .querySelector(".delete-event-button")
        .addEventListener("click", (e) => {
          const eventId = e.target.getAttribute("data-event-id");
          this.#handleDeleteEvent(eventId);
        });
      acceptedEventsList.appendChild(listItem);
    });
  }
  #handleDeleteEvent(eventName) {
    this.#hub.publish(Events.UnStoreMeetings, {
      eventName: eventName,
    });
  }
}
