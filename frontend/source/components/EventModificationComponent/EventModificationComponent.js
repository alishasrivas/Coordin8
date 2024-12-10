import { BaseComponent } from "../BaseComponent/BaseComponent.js";
// In EventModificationComponent.js
import { RepositoryRemoteService } from '../../services/RepositoryRemoteService.js';
import { Events } from '../../eventhub/Events.js';

export class EventModificationComponent extends BaseComponent {
  #events = null;
  #container = null;
  #invitees = [];
  #repositoryService = new RepositoryRemoteService();

  constructor(events, container) {
    super();
    this.loadCSS("EventModificationComponent");
    this.#events = events;
    this.#container = container;
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
    this.#container = document.createElement("div");
    this.#container.classList.add("event-modification-container");
    this.#updateEventsList();
  }

  #updateEventsList() {
    if (!this.#container) return;
    const eventsList = this.#container.querySelector("#events-list");
    eventsList.innerHTML = this.#events.map(event => `
      <div class="event" data-event-name="${event.name}">
        <div class="event-details">
          <h2>${event.name}</h2>
          <p>${event.description}</p>
          <ul>
            <li><strong>Date</strong>: ${event.times[0].date}</li>
            <li><strong>Time</strong>: ${event.times[0].startTime} - ${event.times[0].endTime}</li>
          </ul>
          <div class="invitees-list" style="display: none;">
            <p>Invitees: ${event.invitees ? event.invitees.join(', ') : ''}</p>
          </div>
        </div>
        <div class="event-buttons">
          <button class="edit-button">Edit</button>
          <button class="delete-button">Delete</button>
        </div>
      </div>
    `).join('');
  }

  #attachEventListeners() {
    const eventsList = this.#container.querySelector("#events-list");
    eventsList.addEventListener("click", (event) => {
      const editButton = event.target.closest(".edit-button");
      const deleteButton = event.target.closest(".delete-button");

      if (editButton) {
        const eventName = editButton.closest(".event").dataset.eventName;
        this.openEditScreen(eventName);
      } else if (deleteButton) {
        const eventName = deleteButton.closest(".event").dataset.eventName;
        this.deleteEvent(eventName);
      }
    });
  }

  openEditScreen(eventName) {
    const eventToEdit = this.#events.find(event => event.name === eventName);
    if (eventToEdit) {
      this.#invitees = eventToEdit.invitees || [];
      const editFormHTML = `
        <div class="event-input-container">
          <div id="blue-header">
            <h1>Edit Event</h1>
          </div>
          <div id="event-creation-body">
            <h2>Event Details</h2>
            <label for="eventName">Enter event name:</label>
            <input type="text" id="eventName" class="event-input" name="eventName" value="${eventToEdit.name}">
            <label for="eventDescription">Enter description:</label>
            <textarea id="eventDescription" class="event-input" name="eventDescription" rows="4" cols="50">${eventToEdit.description}</textarea>
            
            <h2>Invite Others</h2>
            <label for="inviteeEmail">Invitee Email:</label>
            <input type="email" id="inviteeEmail" class="event-input" name="inviteeEmail">
            <button id="addInvitee" class="add-to-list">Add Invitee</button>
            <ul id="invitees-list" class="interactive-list">
              ${this.#invitees.map(invitee => `<li>${invitee} <button class="delete-invitee-btn">Delete</button></li>`).join('')}
            </ul>

            <h2>Enter potential event times</h2>
            <div id="times-list">
              <label for="start-time">Start time:</label>
              <input type="time" id="start-time" class="time-input" name="start-time" value="${eventToEdit.times[0].startTime}">
              <label for="end-time">End time:</label>
              <input type="time" id="end-time" class="time-input" name="end-time" value="${eventToEdit.times[0].endTime}">
              <label for="enter-date">Enter date:</label>
              <input type="date" id="enter-date" class="time-input" name="enter-date" value="${eventToEdit.times[0].date}">
            </div>
          </div>
          <button id="saveChanges" class="add-to-list">Save Changes</button>
          <button id="cancelEdit" class="add-to-list">Cancel</button>
        </div>
      `;
      const container = this.#container.querySelector("#events-list");
      container.innerHTML = editFormHTML;

      // Attach event listeners for saving or canceling changes
      container.querySelector("#saveChanges").addEventListener("click", () => this.#saveEventChanges(eventName));
      container.querySelector("#cancelEdit").addEventListener("click", () => this.#updateEventsList());
      container.querySelector("#addInvitee").addEventListener("click", () => this.#addInvitee());
      this.#attachDeleteInviteeListeners();
    }
  }

  #addInvitee() {
    const inviteeEmail = this.#container.querySelector("#inviteeEmail").value.trim();
    if (inviteeEmail && !this.#invitees.includes(inviteeEmail)) {
      this.#invitees.push(inviteeEmail);
      this.#updateInviteesList();
    }

  }

  #updateInviteesList() {
    const inviteesList = this.#container.querySelector("#invitees-list");
    inviteesList.innerHTML = this.#invitees.map(invitee => `<li>${invitee} <button class="delete-invitee-btn">Delete</button></li>`).join('');
    this.#attachDeleteInviteeListeners();
  }

  #attachDeleteInviteeListeners() {
    const deleteButtons = this.#container.querySelectorAll(".delete-invitee-btn");
    deleteButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        this.#invitees.splice(index, 1);
        this.#updateInviteesList();
      });
    });
  }

  async #saveEventChanges(eventName) {
    const updatedName = this.#container.querySelector("#eventName").value;
    const updatedDescription = this.#container.querySelector("#eventDescription").value;
    const updatedDate = this.#container.querySelector("#enter-date").value;
    const updatedStartTime = this.#container.querySelector("#start-time").value;
    const updatedEndTime = this.#container.querySelector("#end-time").value;

    const eventIndex = this.#events.findIndex(event => event.name === eventName);
    if (eventIndex > -1) {
        const updatedEvent = {
            name: updatedName,
            description: updatedDescription,
            times: [{ date: updatedDate, startTime: updatedStartTime, endTime: updatedEndTime }],
            invitees: this.#invitees,
        };

        try {
            // Use the service to update the event
            await this.#repositoryService.updateEvent(this.#events[eventIndex].id, updatedEvent);
            console.log("Event updated successfully");
        } catch (error) {
            console.error("Failed to update event:", error);
        }
    }
  }

  async fetchEventData(){
    try {
        const response = await fetch('');
        const data = await response.json();
        this.render();
    }
    catch (error) {
        console.error("Failed to fetch event data:", error);
    }
  }
  
}
