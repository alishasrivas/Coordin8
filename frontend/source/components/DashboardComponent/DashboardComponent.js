import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { mainMeetingRepository } from "../../main.js";
import { EventModificationComponent } from "../EventModificationComponent/EventModificationComponent.js";

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
    this.#subscribeToEvents();
    this.#initializeDatabase();
  }

  async #initializeDatabase() {
    try {
      await mainMeetingRepository.initDB();
      await this.#fetchEvents();
    } catch (error) {
      console.error('Failed to initialize database:', error);
    }
  }

  async #fetchEvents() {
    try {
      const events = await mainMeetingRepository.loadMeetingsFromDB();
      // console.log('Fetched events:', events); // Log fetched events
      this.#events = events;
      this.#applyCurrentFilter();
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
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
    this.#container.classList.add("dashboard-container");
    this.#container.innerHTML = this.#getTemplate();
    document.body.appendChild(this.#container);
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
    console.log(this.#filteredEvents.length);
    return this.#filteredEvents.map(e => this.#getEventTemplate(e)).join('');
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
    `;
  }

  #updateEventsList() {
    if (!this.#container) return;
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
        this.#handleEditEvent(eventName);
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

  deleteEvent(eventName) {
    if (confirm(`Are you sure you want to delete the event "${eventName}"?`)) {
      this.#events = this.#events.filter(event => event.name !== eventName);
      alert(`Event "${eventName}" deleted successfully.`);
      this.#updateEventsList();
    }
  }

  #subscribeToEvents() {
    const eventHub = EventHub.getInstance();
    eventHub.subscribe(Events.StoreMeetingSuccess, () => this.#fetchEvents());
    eventHub.subscribe(Events.UnStoreMeetings, () => this.#fetchEvents());
  }

  #handleEditEvent(eventName) {
    const eventModification = new EventModificationComponent(this.#events, this.#container, this.#updateEventsList.bind(this));
    eventModification.openEditScreen(eventName);
  }
}
