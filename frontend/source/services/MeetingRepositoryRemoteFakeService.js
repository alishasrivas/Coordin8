import Service from "./Service.js";
import { Events } from "../eventhub/Events.js";
import { fetch } from "../utility/fetch.js";

const BASE_URL = "http://localhost:3000/meeting";

export class MeetingRepositoryRemoteFakeService extends Service {
  constructor() {
    super();
  }

  async storeMeeting(meetingData) {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(meetingData),
      });
      if (!response.ok) {
        throw new Error(`Failed to store meeting: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error storing meeting:", error);
      throw error;
    }
  }

  async clearMeetings() {
    try {
      const response = await fetch(BASE_URL, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to clear meetings: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error clearing meeting:", error);
      throw error;
    }
  }

  addSubscriptions() {
    try {
      this.subscribe(Events.StoreMeeting, (data) => {
        this.storeMeeting(data).catch((error) => {
          console.error("Error while handling StoreMeeting event:", error);
        });
      });

      this.subscribe(Events.UnStoreMeetings, () => {
        this.clearMeetings().catch((error) => {
          console.error("Error while handling UnStoreMeetings event:", error);
        });
      });
    } catch (error) {
      console.error("Error in addSubscriptions:", error);
      throw error;
    }
  }
}
