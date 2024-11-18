import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";
import { BaseComponent } from "../BaseComponent/BaseComponent.js";
export class FriendsListComponent extends BaseComponent {
  #container = null;
  #hub = null;

  constructor() {
    super();
    this.loadCSS("FriendsListComponent");
    this.#hub = EventHub.getInstance();
  }

  #buildContainer() {
    this.#container = document.createElement("div");
    this.#container.classList.add("friends-list-container");
    this.#container.innerHTML = this.#getTemplate();
  }

  #getTemplate() {
    return `
        <h2>Friends List</h2>
        <div class = "friends-list-search">
            <input type="text" id="friendsSearchInput" placeholder="Search for your friends here...">
            <button id = "friendsSearchBar">Search</button>
        </div>
        <div class = "friends-list-search-results" id = "friendsRequests"></div>
        <h3>Your Friends</h3>
        <div class = "friends-display" id = "friendsDisplay"></div>
        `;
  }
  #search(query) {
    //add my backend search logic here
    console.log(`Searching for friends with query: ${query}`);
    const resultsContainer = this.#container.querySelector(
      "#friends-list-search-results"
    );
    resultsContainer.innerHTML = `<p>Search results for "${query}" will show here.</p>`;
  }

  #attachEventListeners() {
    // Attaching event listeners for searching for friends
    //SEARCH
    const searchBar = this.#container.querySelector("#friendsSearchBar");
    searchBar.addEventListener("click", () => {
      const query = this.#container.querySelector("#friendsSearchInput").value;
      this.#search(query);
    });
  }

  render() {
    if (this.#container) {
      return this.#container;
    }
    this.#buildContainer();
    this.#attachEventListeners();
    return this.#container;
  } //same as everyone else's render
}
