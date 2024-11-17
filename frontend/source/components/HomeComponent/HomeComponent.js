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
      <p>Coordin8 is an application that helps you organize meetings effortlessly, even across different time zones. Use the navigation bar above to explore all the features we offer!</p>
      <p>Here's what you can do: </p>
      <ul>
        <li><span>Create Event</span>: Schedule meetings and invite others with ease.</li>
        <li><span>Dashboard</span>: View and manage all your upcoming and past events.</li>
        <li><span>Friends List</span>: Search for users and add them to your friends list for quick access.</li>
        <li><span>Profile Settings</span>: Update your personal information, set your timezone, and customize notification preferences.</li>
      </ul>
    `;
  }
}
