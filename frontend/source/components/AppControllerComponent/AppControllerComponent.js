import { EventCreationComponent } from "../EventCreationComponent/EventCreationComponent.js";
import { HomeComponent } from "../HomeComponent/HomeComponent.js";
import { DashboardComponent } from "../DashboardComponent/DashboardComponent.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { ProfileSettingComponent } from "../ProfileSettingComponent/ProfileSettingComponent.js";

export class AppControllerComponent extends BaseComponent {
  #container = null; // Private container for the component
  #currentView = "home"; // Track the current view ('home', 'create', or 'dashboard')
  #eventCreationComponent = null; // Instance of the event creation component
  #homeComponent = null; // Instance of home home component
  #dashboardComponent = null; // Instance of the dashboard component
  #hub = null; // EventHub instance for managing events
  #profileSetting = null // profile setting page
  #LogIn = null
  #SignUp = null

  constructor() {
    super();
    this.loadCSS("AppControllerComponent");
    this.#hub = EventHub.getInstance();
    this.#eventCreationComponent = new EventCreationComponent();
    this.#homeComponent = new HomeComponent();
    this.#dashboardComponent = new DashboardComponent(); // Create an instance of DashboardComponent
    this.#profileSetting = new ProfileSettingComponent();
  }

  // Render the AppController component and return the container
  render() {
    this.#createContainer();
    this.#setupContainerContent();
    return this.#container;
  }

  #createContainer() {
    this.#container = document.createElement('div');
    this.#container.classList.add('app-controller-container');
    this.#container.innerHTML = this.#getTemplate();
    this.#attachEventListeners();
  }

  #getTemplate() {
    return `
      <div class="navigation-bar">
        <button id="homeBtn">Home</button>
        <button id="createEventBtn">Create Event</button>
        <button id="dashboardBtn">Dashboard</button> <!-- Add Dashboard button -->
        <button id="profileSettingsBtn">Profile Settings</button>
      </div>
      <div id="viewContainer">
        <!-- View content will be dynamically added here -->
      </div>
    `;
  }

  #attachEventListeners() {
    const homeBtn = this.#container.querySelector('#homeBtn');
    const createEventBtn = this.#container.querySelector('#createEventBtn');
    const dashboardBtn = this.#container.querySelector('#dashboardBtn'); // Select Dashboard button
    const profileSettingsBtn = this.#container.querySelector('#profileSettingsBtn');

    homeBtn.addEventListener('click', () => this.#switchView('home'));
    createEventBtn.addEventListener('click', () => this.#switchView('create'));
    dashboardBtn.addEventListener('click', () => this.#switchView('dashboard')); // Add event listener for Dashboard button
    profileSettingsBtn.addEventListener('click', () => this.#switchView('profile'));
  }

  #switchView(view) {
    this.#currentView = view;
    this.#setupContainerContent();
  }

  #setupContainerContent() {
    const viewContainer = this.#container.querySelector('#viewContainer');
    viewContainer.innerHTML = '';

    switch (this.#currentView) {
      case 'home':
        viewContainer.appendChild(this.#homeComponent.render());
        break;
      case 'create':
        viewContainer.appendChild(this.#eventCreationComponent.render());
        break;
      case 'dashboard':
        viewContainer.appendChild(this.#dashboardComponent.render()); // Render DashboardComponent
        break;
      case 'profile':
        viewContainer.appendChild(this.#profileSetting.render()); // Render DashboardComponent
        console.log("Profile called")
        break;
    }
  }
}