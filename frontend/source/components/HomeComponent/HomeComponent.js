import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../BaseComponent/BaseComponent.js";

//this component will serve as a temporary home screen

export class HomeComponent extends BaseComponent {
  #container = null;

  constructor() {
    super();
    this.loadCSS("HomeComponent");
  }

  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createContainer();
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
        <h1>Welcome to Coordin8!</h1>
      </div>
      <p>Welcome to Coorin8! Use the navigation bar above to explore this application!</p>
      <p>Click <span>Create Event</span> to schedule a meeting and invite others!</p>
      <p>Click <span>Dashboard</span> to view your all your upcoming and past events!</p>
      <p>Click <span>Friends List</span> to search and save other users to your friends list!</p>
      <p>Click <span>Profile Settings</span> to specify your personal information, timezone, and notification preferences!</p>
    `;
  }
}
