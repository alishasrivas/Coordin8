/**
 * An object containing various message types for event management.
 */
export const Events = {
  NewEvent: "NewEvent",

  LoadEvents: "LoadEvents",
  LoadEventsSuccess: "LoadEventsSuccess",
  LoadEventsFailure: "LoadEventsFailure",

  StoreEvent: "StoreEvent",
  StoreEventSuccess: "StoreEventSuccess",
  StoreEventFailure: "StoreEventFailure",

  UnStoreEvents: "UnStoreEvents",
  UnStoreEventsSuccess: "UnStoreEventsSuccess",
  UnStoreEventsFailure: "UnStoreEventsFailure",

  // View Switching Events:
  SwitchToDashboardView: "SwitchToDashboardView",
  SwitchToCreateView: "SwitchToCreateView",
};
