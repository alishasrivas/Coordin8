import Service from "./Service.js";
import { fetch } from "../utility/fetch.js";

export class MeetingRepositoryRemoteFakeService extends Service {
  constructor() {
    super();
  }

  async storeMeeting(meetingData) {
    const response = await fetch("http://localhost:3000/meeting", {
      method: "POST",
      body: JSON.stringify(meetingData),
    });
    const data = await response.json();
    return data;
  }

  async clearMeetings() {
    const response = await fetch("http://localhost:3000/meetings", {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  }

  addSubscriptions() {
    this.subscribe(Events.StoreMeeting, (data) => {
      this.storeMeeting(data);
    });

    this.subscribe(Events.UnStoreMeetings, () => {
      this.clearMeetings();
    });
  }
}
