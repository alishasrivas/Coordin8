## Contribution Log for Joshua Swaida

### October 18, 2024
- **Task**: Set up the folders and files in the GitHub repository.
- **Details**: Organized folders for `team/m2` and `reports`.
- **Link to Commit**: [Initial Commit](https://github.com/alishasrivas/Coordin8/commit/d4af50ed36cd99aa6df25123a9c546ed93b8870c)

### October 18, 2024
- **Task**: Started the first version of the `features.md` file.
- **Details**: Wrote some initial ideas for potential features, included brief descriptions.
- **Link to Commit**: [Commit for initial features.md](https://github.com/alishasrivas/Coordin8/commit/b65773e331ce4e9600439f8a30a85606c7f49608)

### October 21, 2024
- **Task**: Finished the first version of the `features.md` file.
- **Details**: Finalized the list of features, expanded the descriptions, and assigned team members to each task.
- **Link to Commit**: [Commit for finalized features.md](https://github.com/alishasrivas/Coordin8/commit/8e2da0cfb2a371ce92726506b57ed52e8f26f175)

### October 21, 2024
- **Task**: Organized the team discord and assigned team members to every feature
- **Details**: Facilitated communication in the team discord and made sure everyone was assigned to their preferred feature (asked everyone for their preference).
- **Link to Commit**: [Commit for description of progress made](https://github.com/alishasrivas/Coordin8/commit/64cffaa44dc3ffae373a6f94fd4137bda714cf10)

### October 28, 2024
- **Task**: Created project/structure branch and set up project structure
- **Details**: I created a branch called project/structure. On this branch, I created a frontend folder, ran npm init, installed http-server dependency, created source folder (which contained a components, eventhub, and service folder) and created a tests folder. This all makes up the general project structure.
- **Link to Commit**: [Commit for project structure creation](https://github.com/alishasrivas/Coordin8/pull/13/commits/d8791adb8ad2a241c082f5db7486cace2d89147a)

### November 6, 2024
- **Task**: Improved and added to project structure
- **Details**: Added files to eventhub (EventHub.js, Events.js) and services folder (MeetingRepositoryFactory.js, MeetingRepositoryRemoteFakeService.js, MeetingRepositoryService.js, Service.js). Added a utility folder with a fetch.js file that simulated a fetch call. Added error handling and type checking to MeetingRepositoryRemoteFakeService.js, EventHub.js, and MeetingRepositoryFactory.js. I made all of these changes on the project/structure branch I created.
- **Link to Commit**: [Commit for project structure improvements](https://github.com/alishasrivas/Coordin8/pull/15/commits/644975e3e6a40108243336366cea31fe2e342c70)

### November 15, 2024
- **Task**: Implemented EventCreationComponent, Homepage component, and finalized project structure
- **Details**: I created a new branch to implement my event creation feature: feature/event-creation-joshua. I implemented the UI for event creation (added all the input fields and submission buttons). I finalized the project structure by adding the index.html, main.js, and main.css files. Additionally, I started implementing the AppControllerComponent. I also created a Homepage component and made sure the functionality of switching views works (user can switch between the Homepage view and Event creation view by clicking a button).
- **Link to Commit**: [Commit for EvenrCreationComponent and Hompage component initial implementation](https://github.com/alishasrivas/Coordin8/pull/20/commits/33031bddff8c93305576ae9230933a0ec00ca82d)

### November 16, 2024
- **Task**: Implemented validation for times/date input for my EventCreationComponent
- **Details**: Added multiple if statements and helper methods to validate time inputs (checks format of start time, end time, and date). These helper methods ensure the time inputs (start time and end time) are in HH:MM format. They also ensure the date input is in YYYY-MM-DD format. Additionally, it makes sure the inputted date is not in the past.
- **Link to Commit**: [Commit for time/date input validation for EventCreationComponent](https://github.com/alishasrivas/Coordin8/commit/7935edb67ec2f0a5f3f218c7cb87a1889e393504)

### November 16, 2024
- **Task**: Implemented InteractiveTimesList for EventCreationComponent
- **Details**: For the EventCreationComponent's InteractiveTimesList, the user can enter in potential times/dates. In this commit, I added a delete button that corresponds to each list element in the potential times list. This allows the user to remove times from their list (removes list element from DOM and removes time from potentialTimes array). Also improved styling for the delete button and list items.
- **Link to Commit**: [Commit for implementation of EventCreationComponent's InteractiveTimeList feature](https://github.com/alishasrivas/Coordin8/commit/7719e8d695a4affb80f130317142b4a372af1df8)

### November 17, 2024
- **Task**: Started Implemention for InteractiveInviteesList for EventCreationComponent
- **Details**: Added a div in the HTML to contain the interactive invitees list. Inside the div I placed a ul. Every time the invite button is clicked, a new li element will be added to the ul. Added event listeners to invite button. Will implement handleInviteUser helper method to deal with the button click.
- **Link to Commit**: [Commit for start of InteractiveInviteeList implementation](https://github.com/alishasrivas/Coordin8/commit/8851dddb6948ca7f54d6c1dd36fe12dbc2ca15da)

### November 17, 2024
- **Task**: Finishing Implemention for EventCreationComponent
- **Details**: Added helper method that can be used to clear potentialInvitees array and the invitee input field. Before this I implemented a helper method (resetTimes) that will clear the potentialTimes array and time input fields. I will call both of these reset methods in handleCreateEvent. This means that after the user clicks the "Create Event" button, all the invitee and time input fields will be cleared. Additionally, the InteractiveInviteesList and InterativeTimesList will be removed from the DOM (we want all event creation screen to reset after an event has been submitted).
- **Link to Commit**: [Commit for finalizing EventCreationComponent](https://github.com/alishasrivas/Coordin8/commit/103da85658bbec173c8b6605453d979a2af04f04)

### November 17, 2024
- **Task**: Finalize Homepage Component Implementation
- **Details**: Added a ul element to make a clear list of the application's features. I improved the quick feature descriptions. I added some styles to the p and list to make it look better.
- **Link to Commit**: [Commit for finalizing Homepage component](https://github.com/alishasrivas/Coordin8/commit/fa3dcbef5c1bb3d99da4635ff8d85160a13bf339)

### November 17, 2024
- **Task**: Updated features.md
- **Details**: I updated all of the features for the features.md it the commits prior to this. For this specific commit, I made sure to specify that the Authentication and Availability Submission features will only have UI implemented for Milestone 3 (the rest of thse features will be implemented in the backend)
- **Link to Commit**: [Commit for updating features.md](https://github.com/alishasrivas/Coordin8/commit/92485c9d619c7caab9a486ca5fd206f13da00168)

### December 2, 2024
- **Task**: Clarify time/date input format for EventCreation component
- **Details**: I updated the placeholder text for the time and date input fields in my EventCreation feature. The placeholder text now specifies that time input must be in HH:MM format and that date input must be in YYYY-MM-DD format. 
- **Link to Commit**: [Commit for clarifying EventCreation time/date input format](https://github.com/alishasrivas/Coordin8/commit/511348549eb1f9e9e09667f001c4c6e12fdf594c)
