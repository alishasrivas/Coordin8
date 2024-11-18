import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class DashboardComponent extends BaseComponent {
  #container = null;
  #events = [];
  #filteredEvents = [];
  #isCalendarView = false;
  #currentFilter = 'all'; // Track the current filter
  #currentSort = ''; // Track the current sort type

  constructor() {
    super();
    this.loadCSS("DashboardComponent");
    this.#initializeFakeEvents();
    this.#subscribeToEvents();
  }

  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createContainer();
    this.#attachEventListeners();
    return this.#container;
  }
  #initializeFakeEvents() {
    this.#events = [
      {
        name: "Event 1",
        description: "Description for Event 1",
        times: [
          { startTime: "10:00 AM", endTime: "11:00 AM", date: "2023-10-01" }
        ],
        invitees: ["Alice", "Bob", "Charlie"]
      },
      {
        name: "Event 2",
        description: "Description for Event 2",
        times: [
          { startTime: "02:00 PM", endTime: "03:00 PM", date: "2023-10-02" }
        ],
        invitees: ["David", "Eve", "Frank"]
      },
      {
        name: "Event 3",
        description: "Description for Event 3",
        times: [
          { startTime: "09:00 AM", endTime: "10:00 AM", date: "2023-10-03" }
        ],
        invitees: ["Grace", "Heidi", "Ivan"]
      }
    ];
    this.#filteredEvents = this.#events;
  }

  #createContainer() {
    // Create and configure the container element
    this.#container = document.createElement("div");
    this.#container.classList.add("dashboard-container");
    this.#container.innerHTML = this.#getTemplate();
  }

  #getTemplate() {
    // Returns the HTML template for the component
    return `
      <div id="dashboard-header">
        <h1>My Events</h1>
        <div class="button-group">
          <button id="all-events-button" class="active">All Events</button>
          <button id="upcoming-events-button">Upcoming Events</button>
          <button id="past-events-button">Past Events</button>
          <button id="view-toggle-button">${this.#isCalendarView ? 'List View' : 'Calendar View'}</button>
          <button id="export-events-button">Export Events</button>
          <div class="dropdown">
            <button id="sort-button">Sort</button>
            <div class="dropdown-content">
              <button id="sort-by-date">Sort by Date</button>
              <button id="sort-by-name">Sort by Name</button>
            </div>
          </div>
        </div>
      </div>
      <input type="text" id="search-bar" placeholder="Search events...">
      <div id="events-list">
        ${this.#isCalendarView ? this.#getCalendarViewTemplate() : this.#getListViewTemplate()}
      </div>
    `;
  }

  #getListViewTemplate() {
    // Returns the HTML template for the list view
    return this.#filteredEvents.map(this.#getEventTemplate).join('');
  }

  #getCalendarViewTemplate() {
    // Returns the HTML template for the calendar view
    return `<p>Calendar view is not implemented yet.</p>`;
  }

  #getEventTemplate(event) {
    return `
      <div class="event" data-event-name="${event.name}">
        <div class="event-details">
          <h2>${event.name}</h2>
          <p>${event.description}</p>
          <ul>
            ${event.times.map(time => `<li>Start: ${time.startTime}, End: ${time.endTime}, Date: ${time.date}</li>`).join('')}
          </ul>
          <div class="invitees-list" style="display: none;">
            <p>Invitees: ${event.invitees.join(', ')}</p>
          </div>
        </div>
        <div class="event-buttons">
          <button class="edit-button">Edit</button>
          <button class="delete-button">Delete</button>
        </div>
      </div>
    `;
  }

  #subscribeToEvents() {
    const hub = EventHub.getInstance();
    hub.subscribe(Events.NewMeeting, this.#handleNewEvent.bind(this));
  }

  #handleNewEvent(event) {
    this.#events.push(event);
    this.#applyCurrentFilter();
    this.#updateEventsList();
  }

  #updateEventsList() {
    const eventsList = this.#container.querySelector("#events-list");
    eventsList.innerHTML = this.#isCalendarView ? this.#getCalendarViewTemplate() : this.#getListViewTemplate();
  }

  
  

  #attachEventListeners() {
    const searchBar = this.#container.querySelector("#search-bar");
    const allEventsButton = this.#container.querySelector("#all-events-button");
    const upcomingEventsButton = this.#container.querySelector("#upcoming-events-button");
    const pastEventsButton = this.#container.querySelector("#past-events-button");
    const viewToggleButton = this.#container.querySelector("#view-toggle-button");
    const exportEventsButton = this.#container.querySelector("#export-events-button");
    const sortByDateButton = this.#container.querySelector("#sort-by-date");
    const sortByNameButton = this.#container.querySelector("#sort-by-name");

    searchBar.addEventListener("input", this.#handleSearch.bind(this));
    allEventsButton.addEventListener("click", this.#showAllEvents.bind(this));
    upcomingEventsButton.addEventListener("click", this.#filterUpcomingEvents.bind(this));
    pastEventsButton.addEventListener("click", this.#filterPastEvents.bind(this));
    viewToggleButton.addEventListener("click", this.#toggleView.bind(this));
    exportEventsButton.addEventListener("click", this.#exportEvents.bind(this));
    sortByDateButton.addEventListener("click", this.#sortByDate.bind(this));
    sortByNameButton.addEventListener("click", this.#sortByName.bind(this));

    const eventElements = this.#container.querySelectorAll(".event");
    eventElements.forEach(eventElement => {  
      eventElement.addEventListener("click", () => {
        const inviteesList = eventElement.querySelector(".invitees-list");
        if (inviteesList.style.display === "none") {
          inviteesList.style.display = "block";
        } else {
          inviteesList.style.display = "none";
        }
      });
    });
  
    const eventsList = this.#container.querySelector("#events-list");
    // Attach a single event listener to #events-list
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

  #handleSearch(event) {
    const query = event.target.value.toLowerCase();
    this.#filteredEvents = this.#events.filter(event => event.name.toLowerCase().includes(query));
    this.#updateEventsList();
  }

  #showAllEvents() {
    this.#currentFilter = 'all';
    this.#filteredEvents = this.#events;
    this.#updateEventsList();
    this.#setActiveButton("#all-events-button");
  }

  #filterUpcomingEvents() {
    this.#currentFilter = 'upcoming';
    const now = new Date();
    this.#filteredEvents = this.#events.filter(event => new Date(event.times[0].date) >= now);
    this.#updateEventsList();
    this.#setActiveButton("#upcoming-events-button");
  }

  #filterPastEvents() {
    this.#currentFilter = 'past';
    const now = new Date();
    this.#filteredEvents = this.#events.filter(event => new Date(event.times[0].date) < now);
    this.#updateEventsList();
    this.#setActiveButton("#past-events-button");
  }

  #toggleView() {
    this.#isCalendarView = !this.#isCalendarView;
    this.#updateEventsList();
    this.#updateViewToggleButton();
  }

  #updateViewToggleButton() {
    const viewToggleButton = this.#container.querySelector("#view-toggle-button");
    viewToggleButton.textContent = this.#isCalendarView ? 'List View' : 'Calendar View';
  }

  #setActiveButton(buttonSelector) {
    const buttons = this.#container.querySelectorAll(".button-group button");
    buttons.forEach(button => button.classList.remove("active"));
    const activeButton = this.#container.querySelector(buttonSelector);
    activeButton.classList.add("active");
  }

  #applyCurrentFilter() {
    switch (this.#currentFilter) {
      case 'upcoming':
        this.#filterUpcomingEvents();
        break;
      case 'past':
        this.#filterPastEvents();
        break;
      default:
        this.#showAllEvents();
        break;
    }
  }

  #sortByDate() {
    const now = new Date();
    this.#filteredEvents.sort((a, b) => {
      const dateA = new Date(a.times[0].date);
      const dateB = new Date(b.times[0].date);
      return Math.abs(dateA - now) - Math.abs(dateB - now);
    });
    this.#updateEventsList();
    this.#setActiveSortButton("#sort-by-date");
  }

  #sortByName() {
    this.#filteredEvents.sort((a, b) => a.name.localeCompare(b.name));
    this.#updateEventsList();
    this.#setActiveSortButton("#sort-by-name");
  }

  #setActiveSortButton(buttonSelector) {
    const sortButtons = this.#container.querySelectorAll(".dropdown-content button");
    sortButtons.forEach(button => button.classList.remove("active"));
    const activeSortButton = this.#container.querySelector(buttonSelector);
    activeSortButton.classList.add("active");
  }

  #exportEvents() {
    alert("Export Events");
  }

  openEditScreen(eventName) {
    const eventToEdit = this.#events.find(event => event.name === eventName);
    if (eventToEdit) {
      const editFormHTML = `
        <div class="edit-event-form">
          <label for="eventName">Event Name:</label>
          <input id="eventName" value="${eventToEdit.name}" />
          <label for="eventDescription">Description:</label>
          <textarea id="eventDescription">${eventToEdit.description}</textarea>
          <button id="saveChanges">Save Changes</button>
          <button id="cancelEdit">Cancel</button>
        </div>
      `;
      const container = this.#container.querySelector("#events-list");
      container.innerHTML = editFormHTML;
  
      // Attach event listeners for saving or canceling changes
      container.querySelector("#saveChanges").addEventListener("click", () => this.#saveEventChanges(eventName));
      container.querySelector("#cancelEdit").addEventListener("click", () => this.#updateEventsList());
    }
  }
  #saveEventChanges(eventName) {
    const updatedName = this.#container.querySelector("#eventName").value;
    const updatedDescription = this.#container.querySelector("#eventDescription").value;

    const eventIndex = this.#events.findIndex(event => event.name === eventName);
    if (eventIndex > -1) {
      this.#events[eventIndex].name = updatedName;
      this.#events[eventIndex].description = updatedDescription;
      alert(`Event "${eventName}" updated successfully!`);
      this.#updateEventsList(); // Refresh the list view after saving
    }
  }
  deleteEvent(eventName) {
    if (confirm(`Are you sure you want to delete the event "${eventName}"?`)) {
      this.#events = this.#events.filter(event => event.name !== eventName);
      alert(`Event "${eventName}" deleted successfully.`);
      this.#updateEventsList();
    }
  }
}
