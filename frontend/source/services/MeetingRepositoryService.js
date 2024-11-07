import { Events } from '../eventhub/Events.js';
import Service from './Service.js';

export class MeetingRepositoryService extends Service {
  constructor() {
    super();
    this.dbName = 'meetingDB';
    this.storeName = 'meetings';
    this.db = null;

    // Initialize the database
    this.initDB()
      .then(() => {
        // Load meetings on initialization
        this.loadMeetingsFromDB();
      })
      .catch(error => {
        console.error(error);
      });
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = event => {
        const db = event.target.result;
        db.createObjectStore(this.storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });
      };

      request.onsuccess = event => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = event => {
        reject('Error initializing IndexedDB');
      };
    });
  }

  async storeMeeting(meetingData) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(meetingData);

      request.onsuccess = () => {
        this.publish(Events.StoreMeetingSuccess, meetingData);
        resolve('Meeting stored successfully');
      };

      request.onerror = () => {
        this.publish(Events.StoreMeetingFailure, meetingData);
        reject('Error storing meeting: ');
      };
    });
  }

  async loadMeetingsFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = event => {
        const meetings = event.target.result;
        meetings.forEach(meeting => this.publish('NewMeeting', meeting));
        resolve(meetings);
      };

      request.onerror = () => {
        this.publish(Events.LoadMeetingsFailure);
        reject('Error retrieving meetings');
      };
    });
  }

  async clearMeetings() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        this.publish(Events.UnStoreMeetingsSuccess);
        resolve('All meetings cleared');
      };

      request.onerror = () => {
        this.publish(Events.UnStoreMeetingsFailure);
        reject('Error clearing meetings');
      };
    });
  }

  addSubscriptions() {
    this.subscribe(Events.StoreMeeting, data => {
      this.storeMeeting(data);
    });

    this.subscribe(Events.UnStoreMeetings, () => {
      this.clearMeetings();
    });
  }
}
