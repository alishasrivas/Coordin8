export class EventHub {
  constructor() {
    this.events = {};
  }

  // Subscribe to an event with type/error handling
  subscribe(event, listener) {
    if (typeof event !== "string") {
      throw new TypeError("Event name must be a string");
    }
    if (typeof listener !== "function") {
      throw new TypeError("Listener must be a function");
    }

    // Initialize a new Set for the event if it doesn't exist
    if (!this.events[event]) {
      this.events[event] = new Set();
    }

    // Add the listener to the Set (automatically prevents duplicates)
    this.events[event].add(listener);

    // Return an unsubscribe function for convenience
    return () => this.unsubscribe(event, listener);
  }

  // Publish an event with type/error handling
  publish(event, data) {
    if (typeof event !== "string") {
      throw new TypeError("Event name must be a string");
    }

    if (!this.events[event]) return;

    // Ensure that the data is valid for each listener
    this.events[event].forEach((listener) => {
      try {
        listener(data);
      } catch (error) {
        console.error(`Error in listener for event "${event}":`, error);
      }
    });
  }

  // Unsubscribe from an event with type/error handling
  unsubscribe(event, listenerToRemove) {
    if (typeof event !== "string") {
      throw new TypeError("Event name must be a string");
    }
    if (typeof listenerToRemove !== "function") {
      throw new TypeError("Listener must be a function");
    }

    if (!this.events[event]) return;

    // Remove the listener from the Set
    this.events[event].delete(listenerToRemove);
  }

  // Define a static reference to the EventHub
  static instance = null;

  // Get an instance of the EventHub
  static getInstance() {
    if (!EventHub.instance) {
      EventHub.instance = new EventHub();
    }
    return EventHub.instance;
  }
}
