import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { MeetingRepositoryService } from "../../services/MeetingRepositoryService.js";

export class EventFinalizationComponent extends BaseComponent {
  #container = null;
  #availabilityData = [];
  #filteredData = [];
  #selectedTimes = new Map(); // To store selected times for each event
  #meetingRepositoryService = new MeetingRepositoryService();

  constructor() {
    super();
    this.loadCSS("EventFinalizationComponent");
    this.#meetingRepositoryService.initDB();
  }

  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createContainer();
    this.#fetchAvailabilityData();
    this.#attachEventListeners();
    return this.#container;
  }

  #createContainer() {
    this.#container = document.createElement("div");
    this.#container.classList.add("event-finalization-container");
    this.#container.innerHTML = this.#getTemplate();
  }

  async #fetchAvailabilityData() {
    // Mock data for testing
    this.#availabilityData = [
      {
        eventName: "Team Meeting",
        totalInvitees: 10,
        invitees: ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi"],
        potentialTimes: [
          { date: "2023-10-01", startTime: "10:00 AM", endTime: "11:00 AM", participantsAvailable: 8, participants: ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi"] },
          { date: "2023-10-02", startTime: "02:00 PM", endTime: "03:00 PM", participantsAvailable: 7, participants: ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace"] }
        ]
      },
      {
        eventName: "Project Kickoff",
        totalInvitees: 15,
        invitees: ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy", "Mallory", "Niaj", "Olivia", "Peggy", "Sybil"],
        potentialTimes: [
          { date: "2023-10-02", startTime: "02:00 PM", endTime: "03:00 PM", participantsAvailable: 15, participants: ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy", "Mallory", "Niaj", "Olivia", "Peggy", "Sybil"] }
        ]
      },
      {
        eventName: "Client Presentation",
        totalInvitees: 5,
        invitees: ["Alice", "Bob", "Charlie", "David", "Eve"],
        potentialTimes: [
          { date: "2023-10-03", startTime: "09:00 AM", endTime: "10:00 AM", participantsAvailable: 5, participants: ["Alice", "Bob", "Charlie", "David", "Eve"] },
          { date: "2023-10-04", startTime: "11:00 AM", endTime: "12:00 PM", participantsAvailable: 4, participants: ["Alice", "Bob", "Charlie", "David"] }
        ]
      },
      {
        eventName: "Weekly Sync",
        totalInvitees: 8,
        invitees: ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi"],
        potentialTimes: [
          { date: "2023-10-05", startTime: "10:00 AM", endTime: "11:00 AM", participantsAvailable: 6, participants: ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"] },
          { date: "2023-10-06", startTime: "02:00 PM", endTime: "03:00 PM", participantsAvailable: 7, participants: ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace"] }
        ]
      },
      {
        eventName: "Sprint Planning",
        totalInvitees: 12,
        invitees: ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy", "Mallory", "Niaj"],
        potentialTimes: [
          { date: "2023-10-07", startTime: "09:00 AM", endTime: "10:00 AM", participantsAvailable: 10, participants: ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy"] },
          { date: "2023-10-08", startTime: "11:00 AM", endTime: "12:00 PM", participantsAvailable: 9, participants: ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi", "Ivan"] }
        ]
      }
    ];
    this.#filteredData = this.#availabilityData;
    this.#updateAvailabilityList();
    this.#sortByName();
  }

  #updateAvailabilityList() {
    const availabilityList = this.#container.querySelector("#availability-list");
    availabilityList.innerHTML = this.#filteredData.map(this.#getAvailabilityTemplate).join('');
    this.#attachTimeSelectionListeners();
  }

  #attachEventListeners() {
    const searchBar = this.#container.querySelector("#search-bar");
    const sortByNameButton = this.#container.querySelector("#sort-by-name");
    const sortByDateButton = this.#container.querySelector("#sort-by-date");
    const finalizeButton = this.#container.querySelector("#finalize-button");
    const filterEveryoneCanJoinButton = this.#container.querySelector("#filter-everyone-can-join");

    searchBar.addEventListener("input", this.#handleSearch.bind(this));
    sortByNameButton.addEventListener("click", this.#sortByName.bind(this));
    sortByDateButton.addEventListener("click", this.#sortByDate.bind(this));
    finalizeButton.addEventListener("click", this.#handleFinalize.bind(this));
    filterEveryoneCanJoinButton.addEventListener("click", this.#toggleActiveState.bind(this));
  }

  #attachTimeSelectionListeners() {
    const potentialTimes = this.#container.querySelectorAll(".potential-time");
    potentialTimes.forEach(time => {
      time.addEventListener("click", this.#handleTimeSelection.bind(this));
    });
  }

  #handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    this.#filteredData = this.#availabilityData.filter(event =>
      event.eventName.toLowerCase().includes(searchTerm)
    );
    this.#updateAvailabilityList();
  }

  #sortByName() {
    this.#filteredData.sort((a, b) => a.eventName.localeCompare(b.eventName));
    this.#updateAvailabilityList();
  }

  #sortByDate() {
    this.#filteredData.sort((a, b) => {
      const aDate = new Date(a.potentialTimes[0].date);
      const bDate = new Date(b.potentialTimes[0].date);
      return aDate - bDate;
    });
    this.#updateAvailabilityList();
  }

  #filterEveryoneCanJoin() {
    this.#filteredData = this.#availabilityData.filter(event =>
      event.potentialTimes.some(time => time.participantsAvailable === event.totalInvitees)
    );
    this.#updateAvailabilityList();
  }

  #toggleActiveState(event) {
    const button = event.currentTarget;
    button.classList.toggle("active");

    if (button.classList.contains("active")) {
      this.#filterEveryoneCanJoin();
    } else {
      this.#filteredData = this.#availabilityData;
      this.#updateAvailabilityList();
    }
  }

  #handleTimeSelection(event) {
    const selectedTime = event.currentTarget;
    const eventName = selectedTime.getAttribute("data-event");
    const timeIndex = selectedTime.getAttribute("data-index");

    // Check if the time is already selected
    if (selectedTime.classList.contains("selected")) {
      selectedTime.classList.remove("selected");
      this.#selectedTimes.delete(eventName);
    } else {
      // Remove previous selection for this event
      const previousSelected = this.#container.querySelector(`.potential-time.selected[data-event="${eventName}"]`);
      if (previousSelected) {
        previousSelected.classList.remove("selected");
      }

      // Mark the new selection
      selectedTime.classList.add("selected");

      // Store the selected time
      this.#selectedTimes.set(eventName, timeIndex);
    }

  }

  async #handleFinalize() {
    // Logic to finalize the event day/time
    const finalizedEvents = [];

    this.#selectedTimes.forEach((timeIndex, eventName) => {
      const event = this.#availabilityData.find(event => event.eventName === eventName);
      const selectedTime = event.potentialTimes[timeIndex];
      finalizedEvents.push({
        eventName: event.eventName,
        date: selectedTime.date,
        startTime: selectedTime.startTime,
        endTime: selectedTime.endTime,
        participants: selectedTime.participants
      });
    });

    try {
      for (const event of finalizedEvents) {
        await this.#meetingRepositoryService.storeFinalizedEvent(event);
      }
      alert("Event day/time finalized and stored!");
    } catch (error) {
      console.error("Error finalizing events:", error);
      alert("Error finalizing events. Please try again.");
    }
  }

  #getTemplate() {
    return `
      <div id="finalization-header">
        <h1>Finalize Event Day/Time</h1>
        <div class="button-group">
          <button id="filter-everyone-can-join">Filter Everyone Can Join</button>
          <div class="dropdown">
            <button id="sort-button">Sort</button>
            <div class="dropdown-content">
              <button id="sort-by-name">Sort by Name</button>
              <button id="sort-by-date">Sort by Date</button>
            </div>
          </div>
        </div>
      </div>
      <input type="text" id="search-bar" placeholder="Search events by name...">
      <div id="availability-list">
        ${this.#filteredData.map(this.#getAvailabilityTemplate).join('')}
      </div>
      <button id="finalize-button">Finalize</button>
    `;
  }

  #getAvailabilityTemplate(availability) {
    return `
      <div class="availability">
        <p><strong>Event Name:</strong> ${availability.eventName}</p>
        ${availability.potentialTimes.map((time, index) => `
          <div class="potential-time" data-event="${availability.eventName}" data-index="${index}">
            <p><strong>Date:</strong> ${time.date}</p>
            <p><strong>Start Time:</strong> ${time.startTime}</p>
            <p><strong>End Time:</strong> ${time.endTime}</p>
            <p><strong>Participants Available:</strong> ${time.participantsAvailable}</p>
            <p><strong>Participants:</strong> ${time.participants.join(', ')}</p>
            ${time.participantsAvailable === availability.totalInvitees ? '<p class="all-available">Everyone can join!</p>' : ''}
          </div>
        `).join('')}
        <p><strong>Total Invitees:</strong> ${availability.totalInvitees}</p>
      </div>
    `;
  }
}