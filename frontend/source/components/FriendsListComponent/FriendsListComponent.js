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
        <div id="friends-list-header">Friends List</div>
        <div class="friends-list-container">
            <!-- Search Section -->
            <div class="friends-list-search">
                <input type="text" id="friendsSearchInput" placeholder="Search for your friends here...">
                <button id="friendsSearchBar">Search</button>
            </div>

            <!-- Search Results -->
            <div class="friends-list-search-results" id="friendsRequests">
                <p>No search results yet.</p>
            </div>

            <!-- Friends Display -->
            <h3>Your Friends</h3>
            <div class="friends-display" id="friendsDisplay"></div>
        </div>
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
  #fakeFriendsList(){
    //replace with backend data
    const friendsList = [
      {name : "Alisha", id : 1 },
      {name : "William", id : 2 },
      {name : "Bacch", id : 3}
    ];

    const friends2show = this.#container.querySelector("#friendsDisplay");
    friends2show.innerHTML = "";

    friendsList.forEach((friend) => {
      const frienditem = document.createElement("div");
      frienditem.classList.add("friend-item");   
      frienditem.innerHTML =
      `<span class = "friend-name">${friend.name}</span>
      <button class = "friend-address" data-id="${friend.id}" data-address = "add">Add</button>
      <button class = "friend-address" data-id="${friend.id}" data-address = "remove">Remove</button>`;

      friends2show.appendChild(frienditem);
    });
    const buttons = friends2show.querySelectorAll(".friend-address");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const action = button.dataset.address;
        const identity = button.dataset.id;
      //include the backend code for handling freinds list 
      })
    })
  }
  #attachEventListeners() {
    // Attaching event listeners for searching for friends
    //SEARCH
    const searchBar = this.#container.querySelector("#friendsSearchBar");
    searchBar.addEventListener("click", () => {
      const query = this.#container.querySelector("#friendsSearchInput").value;
      this.#search(query);
    });

    this.#fakeFriendsList();
  }

  render() {
    if (this.#container) {
      return this.#container;
    }
    this.#buildContainer();
    this.#attachEventListeners();
    this.#fakeFriendsList();

    return this.#container;
  } //same as everyone else's render

}
