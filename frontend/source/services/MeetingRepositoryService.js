import { Events } from '../eventhub/Events.js';
import Service from './Service.js';

export class MeetingRepositoryService extends Service {
  constructor() {
    super();
    this.dbName = 'myDatabase';
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
        if (!db.objectStoreNames.contains('meetings')) {
          db.createObjectStore('meetings', {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
        if (!db.objectStoreNames.contains('users')) {
          //this will contain only 1 instance of user
          db.createObjectStore('users', {
            keyPath: 'id',
          });
        }
      };
      request.onsuccess = event => {
        console.log("Success initialized IndexedDB")
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

  async getUserData() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['users'], 'readonly');
      const store = transaction.objectStore('users');
      const request = store.get(1); // only one user (current user)
      request.onsuccess = () => {
        console.log(`Sucessfully get user data, user: ${request.result}`);
        console.log(request.result);
        resolve(request.result);
      };
      request.onerror = (event) => {
        reject(event.target.error);
      };
    })
  }


  async updateUserData(data) {
    return new Promise((resolve, reject) => {
      console.log('updateUserData called with data:', data);
      const transaction = this.db.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      const request = store.put({ ...data, id: 1 });
      request.onsuccess = () => {
        console.log(`Data in users updated successfully.`);
        resolve(request.result);
      };
      request.onerror = (event) => {
        console.error(`Failed to update data in users:`, event.target.error);
        reject('Fail')
      };
      // await transaction.complete;
    })
  }

  //only use once to store current user 
  async storeUser(data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      const request = store.add({ ...data, id: 1 });
      request.onsuccess = () => {
        console.log(`Data stored in Users successfully.`);
        resolve(request.result);
      };
      request.onerror = (event) => {
        console.error(`Failed to store data in Users:`, event.target.error);
        reject('Fail')
      };
    })
  }

  addSubscriptions() {
    //!register events and associated db operations right here
    this.subscribe(Events.StoreMeeting, data => {
      this.storeMeeting(data);
    });

    this.subscribe(Events.UnStoreMeetings, () => {
      this.clearMeetings();
    });

    //for updating user data
    this.subscribe(Events.updateProfileSettings, (data) => {
      this.updateUserData(data);
    })

    this.subscribe(Events.fetchProfileSettings, () => {
      this.getuserData();
    })
  }
}
