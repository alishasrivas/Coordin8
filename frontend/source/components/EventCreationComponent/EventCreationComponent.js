import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class EventCreationComponent extends BaseComponent {
  #container = null;
  #potentialTimes = [];

  constructor() {
    super();
    this.loadCSS("EventCreationComponent");
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
    this.#container.classList.add("event-input-container");
    this.#container.innerHTML = this.#getTemplate();
  }

  #getTemplate() {
    // Returns the HTML template for the component
    return `

      <div id="blue-header">
        <h1>Create New Event</h1>
      </div>

      <div id="event-creation-body">
        <h2>Event Details</h2>
        <label for="eventName">Enter event name:</label>
        <input type="text" id="eventName" class="event-input" name="eventName" placeholder="Type event name here...">

        <label for="eventDescription">Enter description:</label>
        <textarea id="eventDescription" class="event-input" name="eventDescription" rows="4" cols="50" placeholder="Type description here..."></textarea>

        <h2>Invite Others</h2>
        <label for="invitees">Enter invitees:</label>
        <input type="text" id="invitees" class="event-input" name="invitees" placeholder="Type invitee emails separated by commas...">

        <h2>Enter potential event times</h2>
        <div id="times-list">
          <label for="start-time">Start time:</label>
          <input type="text" id="start-time" class="time-input" name="start-time" placeholder="Type here...">


          <label for="end-time">End time:</label>
          <input type="text" id="end-time" class="time-input" name="end-time" placeholder="Type here...">


          <label for="enter-date">Enter date:</label>
          <input type="text" id="enter-date" class="time-input" name="enter-date" placeholder="Type here...">

          <button id="addTime-button">Add Time</button>
          <ul id="timeList"></ul>
        </div>
        
      </div>

      <button id="create-event-button">Create Event</button>
    `;
  }

  #attachEventListeners() {
    // Attach event listeners to the input and button elements
    const createEventBtn = this.#container.querySelector(
      "#create-event-button"
    );
    const eventName = this.#container.querySelector("#eventName");
    const eventDescription = this.#container.querySelector("#eventDescription");

    createEventBtn.addEventListener("click", () =>
      this.#handleCreateEvent(eventName, eventDescription)
    );

    //adding times
    const addTimeBtn = this.#container.querySelector("#addTime-button");
    const startTime = this.#container.querySelector("#start-time");
    const endTime = this.#container.querySelector("#end-time");
    const date = this.#container.querySelector("#enter-date");
    addTimeBtn.addEventListener("click", () =>
      this.#handleAddTime(startTime, endTime, date)
    );
  }

  #handleCreateEvent(eventNameInput, eventDescriptionInput) {
    const eventName = eventNameInput.value;
    const eventDescription = eventDescriptionInput.value;

    if (!eventName) {
      alert("Please enter the event's name.");
      return;
    }
    if (!eventDescription) {
      alert("Please enter the event's description.");
      return;
    }

    // Publish a 'NewEvent' event with the event name, description, and potential times
    this.#publishNewEvent(eventName, eventDescription, this.#potentialTimes);

    // Clear inputs
    this.#clearInputs(eventNameInput, eventDescriptionInput);
  }

  #handleAddTime(startTimeInput, endTimeInput, dateInput) {
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;
    const date = dateInput.value;

    // Make sure each time input field was completed
    if (!startTime) {
      alert("Please enter a start time.");
      return;
    }
    if (!endTime) {
      alert("Please enter a end time.");
      return;
    }
    if (!date) {
      alert("Please enter a date.");
      return;
    }

    // Create the time object and add it to the array
    const time = { startTime, endTime, date };
    this.#potentialTimes.push(time);

    // Add the new time to the visible list
    const timeList = this.#container.querySelector("#timeList");
    const timeContainer = document.createElement("li");
    timeContainer.innerHTML = `
      <p>Start: ${startTime}, End: ${endTime}, Date: ${date}</p>
    `;
    timeList.appendChild(timeContainer);

    // Clear inputs
    this.#clearTimeInputs(startTimeInput, endTimeInput, dateInput);
  }

  #publishNewEvent(name, description, times) {
    const hub = EventHub.getInstance();
    hub.publish(Events.NewMeeting, { name, description, times });
    hub.publish(Events.StoreMeeting, { name, description, times });
  }

  #clearInputs(eventName, eventDescription) {
    // Clear input fields if something is there
    console.log("clearInputs was called correctly!");
    if (eventName) eventName.value = "";
    if (eventDescription) eventDescription.value = "";
  }

  #clearTimeInputs(startTime, endTime, date) {
    if (startTime) startTime.value = "";
    if (endTime) endTime.value = "";
    if (date) date.value = "";
  }
}
