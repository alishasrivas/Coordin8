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
      <p>Welcome to Coorin8 application! Use the navigation bar below to create event!</p>
      
    `;
  }
}
