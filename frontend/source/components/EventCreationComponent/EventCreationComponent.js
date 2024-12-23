import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class EventCreationComponent extends BaseComponent {
  #container = null;
  #hub = null;
  #potentialTimes = [];
  #potentialInvitees = [];

  constructor() {
    super();
    this.loadCSS("EventCreationComponent");
    this.#hub = EventHub.getInstance();
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
        <div id="invitees-list">
          <label for="invitee">Enter invitee:</label>
          <input type="text" id="invitee" class="event-input" name="invitee" placeholder="Type invitee's email...">
          
          <button id="invite-button" class="add-to-list">Invite User</button>
          <ul id="inviteeList" class="interactive-list"></ul>
        </div>



        <h2>Enter potential event times</h2>
        <div id="times-list">
          <label for="start-time">Start time:</label>
          <input type="text" id="start-time" class="time-input" name="start-time" placeholder="HH:MM (24-Hour Format)">


          <label for="end-time">End time:</label>
          <input type="text" id="end-time" class="time-input" name="end-time" placeholder="HH:MM (24-Hour Format)">


          <label for="enter-date">Enter date:</label>
          <input type="text" id="enter-date" class="time-input" name="enter-date" placeholder="YYYY-MM-DD">

          <button id="addTime-button" class="add-to-list">Add Time</button>
          <ul id="timeList" class="interactive-list"></ul>
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

    //inviting users
    const inviteUserBtn = this.#container.querySelector("#invite-button");
    const inviteeInput = this.#container.querySelector("#invitee");
    inviteUserBtn.addEventListener("click", () =>
      this.#handleInviteUser(inviteeInput)
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

    // Ensure user only submits 1 time
    if (this.#potentialTimes.length !== 1) {
      alert("Submit only 1 time.");
      return;
    }

    // Publish a 'NewMeeting' event with the corresponding event details (title, description, invitees, event_time)
    this.#hub.publish(Events.NewMeeting, {
      title: eventName,
      description: eventDescription,
      invitees: this.#potentialInvitees,
      event_time: this.#potentialTimes,
    });

    // Clear event details inputs
    this.#clearEventDetailsInputs(eventNameInput, eventDescriptionInput);

    // Clear invitees and times input fields, UI lists, and arrays
    this.#resetInvitees();
    this.#resetTimes();
  }

  #handleInviteUser(inviteeInput) {
    const invitee = inviteeInput.value.trim();

    // Validate invitee input
    if (!this.#validateInviteeInputs(invitee)) {
      return;
    }

    this.#potentialInvitees.push(invitee);

    // Add the new invitee to the visible list
    // There will be a delete button corresponding to each invitee
    const inviteeList = this.#container.querySelector("#inviteeList");
    const inviteeContainer = document.createElement("li");
    inviteeContainer.innerHTML = `
      <p>Invitee: ${invitee}</p>
      <button class="delete-invitee-btn">Delete</button>
    `;

    // Attach delete button functionality
    const deleteButton = inviteeContainer.querySelector(".delete-invitee-btn");
    deleteButton.addEventListener("click", () =>
      this.#handleDeleteInvitee(invitee, inviteeContainer)
    );

    inviteeList.appendChild(inviteeContainer);

    // Clear inputs
    this.#clearInviteeInputs(inviteeInput);
  }

  #handleDeleteInvitee(inviteeToDelete, inviteeContainer) {
    // Remove the invitee from the #potentialInvitees array
    // Will filter out the invitee to delete
    this.#potentialInvitees = this.#potentialInvitees.filter(
      (invitee) => invitee !== inviteeToDelete
    );

    // Remove the corresponding <li> from the DOM
    inviteeContainer.remove();
  }

  #validateInviteeInputs(invitee) {
    // Ensure the input field is not empty
    if (!invitee) {
      alert("Please enter the invitee's email");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(invitee)) {
      alert("Invalid email format. Please enter a valid email.");
      return false;
    }
    return true;
  }

  #handleAddTime(startTimeInput, endTimeInput, dateInput) {
    const startTime = startTimeInput.value.trim();
    const endTime = endTimeInput.value.trim();
    const date = dateInput.value.trim();

    // Validate time/date inputs
    if (!this.#validateTimeInputs(startTime, endTime, date)) {
      return; // Stop execution if validation fails
    }
    console.log("Time are valid");

    // Create the time object and add it to the array
    const time = { startTime, endTime, date };
    this.#potentialTimes.push(time);

    // Add the new time to the visible list
    // There will be a delete button corresponding to each time
    const timeList = this.#container.querySelector("#timeList");
    const timeContainer = document.createElement("li");
    timeContainer.innerHTML = `
      <p>Start: ${startTime}, End: ${endTime}, Date: ${date}</p>
      <button class="delete-time-btn">Delete</button>
    `;

    // Attach delete button functionality
    const deleteButton = timeContainer.querySelector(".delete-time-btn");
    deleteButton.addEventListener("click", () =>
      this.#handleDeleteTime(time, timeContainer)
    );

    timeList.appendChild(timeContainer);

    // Clear inputs
    this.#clearTimeInputs(startTimeInput, endTimeInput, dateInput);
  }

  #handleDeleteTime(timeToDelete, timeContainer) {
    // Remove the time from the #potentialTimes array
    // Will filter out the time to delete
    this.#potentialTimes = this.#potentialTimes.filter(
      (time) =>
        time.startTime !== timeToDelete.startTime ||
        time.endTime !== timeToDelete.endTime ||
        time.date !== timeToDelete.date
    );

    // Remove the corresponding <li> from the DOM
    timeContainer.remove();
  }

  #validateTimeInputs(startTime, endTime, date) {
    // Make sure each time input field was completed
    if (!startTime) {
      alert("Please enter a start time.");
      return false;
    }
    if (!endTime) {
      alert("Please enter a end time.");
      return false;
    }
    if (!date) {
      alert("Please enter a date.");
      return false;
    }

    // Make sure start time is in HH:MM format
    if (!this.#isTimeValid(startTime)) {
      alert("Invalid start time. Ensure time is in HH:MM format.");
      return false;
    }
    // Make sure end time is in HH:MM format
    if (!this.#isTimeValid(endTime)) {
      alert("Invalid end time. Ensure time is in HH:MM format.");
      return false;
    }

    // Ensure start time is earlier than end time
    if (startTime >= endTime) {
      alert("Start time must be earlier than end time.");
      return false;
    }

    // Make sure dat is in YYYY-MM-DD format
    if (!this.#isDateValid(date)) {
      alert("Invalid date format...Must be in YYYY-MM-DD format");
      return false;
    }

    // Ensure inputted date is not in the past
    const currentDate = new Date(); // Get the current date and time (will be the date the user creates event)
    const inputDate = new Date(date); // Convert the input date string into a Date object
    // Will set hours of current date to midnight...only care about comparing dates, not times
    if (inputDate < currentDate.setHours(0, 0, 0, 0)) {
      alert("The date cannot be in the past.");
      return false;
    }
    return true;
  }

  #isTimeValid(time) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Regex for HH:MM 24-hour format
    return timeRegex.test(time); // Ensure time input matches the HH:MM format
  }
  #isDateValid(date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Regex for YYYY-MM-DD format
    return dateRegex.test(date); // Ensure date input matches the YYYY-MM-DD format
  }

  #clearEventDetailsInputs(eventName, eventDescription) {
    // Clear input fields if something is there
    console.log("clearInputs was called correctly!");
    if (eventName) eventName.value = "";
    if (eventDescription) eventDescription.value = "";
  }

  #clearInviteeInputs(inviteeInput) {
    if (inviteeInput) inviteeInput.value = "";
  }

  #clearTimeInputs(startTime, endTime, date) {
    if (startTime) startTime.value = "";
    if (endTime) endTime.value = "";
    if (date) date.value = "";
  }

  #clearInviteeList() {
    const inviteeList = this.#container.querySelector("#inviteeList");
    if (inviteeList) {
      inviteeList.innerHTML = ""; // Clear all child elements
    }
  }

  #clearTimeList() {
    const timeList = this.#container.querySelector("#timeList");
    if (timeList) {
      timeList.innerHTML = ""; // Clear all child elements
    }
  }

  #resetInvitees() {
    // Clear invitees list in the UI
    this.#clearInviteeList();
    // Clear the potentialInvitees array
    this.#potentialInvitees = [];
    // Clear invitee input field incase the user forgot to click "invite user" button
    const inviteeInput = this.#container.querySelector("#invitee");
    this.#clearInviteeInputs(inviteeInput);
  }

  #resetTimes() {
    // Clear times list in the UI
    this.#clearTimeList();
    // Clear the potentialTimes array
    this.#potentialTimes = [];
    // Clear time input fields incase the user forgot to click "add time" button
    const startTimeInput = this.#container.querySelector("#start-time");
    const endTimeInput = this.#container.querySelector("#end-time");
    const dateInput = this.#container.querySelector("#enter-date");
    this.#clearTimeInputs(startTimeInput, endTimeInput, dateInput);
  }
}
