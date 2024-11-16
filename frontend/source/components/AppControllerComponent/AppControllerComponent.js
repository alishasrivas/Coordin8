import { EventCreationComponent } from "../EventCreationComponent/EventCreationComponent.js";
import { HomeComponent } from "../HomeComponent/HomeComponent.js";
//import DashboardComponent
//import ProfileSettingComponent
//import AvailabilitySubmissionComponent
//import AuthenticationComponent
//import EventModificationComponent
import { EventHub } from "../../eventhub/EventHub.js";

export class AppControllerComponent {
  #container = null; // Private container for the component
  #currentView = "home"; // Track the current view ('home' or 'create')
  #eventCreationComponent = null; // Instance of the event creation component
  #homeComponent = null; // Instance of home home component
  #hub = null; // EventHub instance for managing events

  constructor() {
    this.#hub = EventHub.getInstance();
    this.#eventCreationComponent = new EventCreationComponent();
    this.#homeComponent = new HomeComponent();
  }

  // Render the AppController component and return the container
  render() {
    this.#createContainer();
    this.#setupContainerContent();
    this.#attachEventListeners();

    this.#eventCreationComponent.render();
    this.#homeComponent.render();

    // Initially render the home view
    this.#renderCurrentView();

    return this.#container;
  }

  // Creates the main container element
  #createContainer() {
    this.#container = document.createElement("div");
    this.#container.classList.add("app-controller");
  }

  // Sets up the HTML structure for the container
  #setupContainerContent() {
    this.#container.innerHTML = `
      <div id="viewContainer"></div>
      <button id="switchViewBtn">Switch to Event Creation View</button>
    `;
  }

  // Attaches the necessary event listeners
  #attachEventListeners() {
    const switchViewBtn = this.#container.querySelector("#switchViewBtn");

    // Event listener for switching views
    switchViewBtn.addEventListener("click", () => {
      this.#toggleView();
    });

    // Subscribe to events from the EventHub to manage switching
    this.#hub.subscribe("SwitchToCreateView", () => {
      this.#currentView = "create";
      this.#renderCurrentView();
    });

    this.#hub.subscribe("SwitchToHomeView", () => {
      this.#currentView = "home";
      this.#renderCurrentView();
    });
  }

  // Toggles the view between home and create
  #toggleView() {
    if (this.#currentView === "home") {
      this.#currentView = "create";
      this.#hub.publish("SwitchToCreateView", null);
    } else {
      this.#currentView = "home";
      this.#hub.publish("SwitchToHomeView", null);
    }
  }

  // Renders the current view based on the #currentView state
  #renderCurrentView() {
    const viewContainer = this.#container.querySelector("#viewContainer");
    viewContainer.innerHTML = ""; // Clear existing content

    // Update the button text based on the current view
    const switchViewBtn = this.#container.querySelector("#switchViewBtn");
    switchViewBtn.textContent =
      this.#currentView === "home"
        ? "Switch to Event Creation View"
        : "Switch to Home View";

    if (this.#currentView === "home") {
      // Render the home view
      viewContainer.appendChild(this.#homeComponent.render());
    } else {
      // Render the event creation view
      viewContainer.appendChild(this.#eventCreationComponent.render());
    }
  }
}
