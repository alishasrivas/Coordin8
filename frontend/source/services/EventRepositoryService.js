import { Events } from "../eventhub/Events.js";
import Service from "./Service.js";

export class EventRepositoryService extends Service {
  constructor() {
    super();
    this.dbName = "taskDB";
    this.storeName = "events";
    this.db = null;

    // Initialize the database
    this.initDB()
      .then(() => {
        // Load events on initialization
        this.loadEventsFromDB();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore(this.storeName, {
          keyPath: "id",
          autoIncrement: true,
        });
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject("Error initializing IndexedDB");
      };
    });
  }

  async storeEvent(eventData) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.add(taskData);

      request.onsuccess = () => {
        this.publish(Events.StoreEventSuccess, eventData);
        resolve("Event stored successfully");
      };

      request.onerror = () => {
        this.publish(Events.EventTaskFailure, eventData);
        reject("Error storing event: ");
      };
    });
  }

  async loadEventsFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = (event) => {
        const events = event.target.result;
        events.forEach((event) => this.publish("NewEvent", event));
        resolve(tasks);
      };

      request.onerror = () => {
        this.publish(Events.LoadEventsFailure);
        reject("Error retrieving events");
      };
    });
  }

  async clearEvents() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        this.publish(Events.UnStoreEventsSuccess);
        resolve("All events cleared");
      };

      request.onerror = () => {
        this.publish(Events.UnStoreEventsFailure);
        reject("Error clearing events");
      };
    });
  }

  addSubscriptions() {
    this.subscribe(Events.StoreEvent, (data) => {
      this.storeEvent(data);
    });

    this.subscribe(Events.UnStoreEvents, () => {
      this.clearTasks();
    });
  }
}
