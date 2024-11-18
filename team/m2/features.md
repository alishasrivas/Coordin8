# Application Features

## User Account Creation and Authentication

This feature will allow the user login or sign up. The application will store user data in a database (stored user data will include, username, email, password, and full name).
**NOTE**: for milestone 3, only the UI will be implemented. The rest will be completed in the backend.

### Log-In Form

The login option will prompt users to enter their username and password. Users will not be able to use any other features of the application prior to logging in. 

**Size**: small

**Points**: 1

**Assigned to**: Tan Le

### Sign-Up Form

The sign up option will allow users to create an account by entering their email and creating a password. They will be prompted to create a username and upload a profile image (profile image is optional). The next step in the account creation process will be to enter in important settings (timezone and notification preferences).

**Size**: small

**Points**: 1

**Assigned to**: Tan Le

### Username, timezone, notification preferences form after signing up

This feature allows the user to enter in their initial profile information immediately after signing up. User will enter their username, timezone, and notification preferences.

**Size**: small

**Points**: 1

**Assigned to**: Tan Le
  
## Homepage

A static HTML page that provides information about the application. It includes headings, paragraphs, and lists, but no dynamic elements or data interaction. It’s a straightforward presentation of information without requiring user input.

**Size**: small

**Points**: 1

**Assigned to**: Joshua Swaida


## Event Creation

This feature will allow the user to create an event. 

### Event Creation Form (name, description, invitees, potential times)

This feature allows the user to input event details: meeting name and meeting description. The user can also enter potential times and dates (the exact day and time will be determined in the Event Day/Time Finalization feature). For times, user must fill in start time, end time, and date fields; All fields will be verified for correctness (must ensure HH:MM format for time and YYYY-MM-DD format for the date). The user will also be able to invite other users to the event by entering their email and clicking "invite user" button. 

**Size**: medium

**Points**: 3

**Assigned to**: Joshua Swaida

### Interactive Invitees List

This feature will generate an interactive unordered list of all the invitees. After the user enters the invitee's email, they click the "Invite user" button. This will update the DOM, adding the invitee's email to a list. Next to each invitee's email is a delete button. This allows the user to add and remove invitees from their list.

**Size**: medium

**Points**: 3

**Assigned to**: Joshua Swaida

### Interactive Times List

This feature will generate an interactive unordered list of all the potential times/dates. After the user enters the start time, end time, and data, they click the "Add Time" button. This will update the DOM, adding the potetial time/date to a list. Next to each time/date a delete button. This allows the user to add and remove potential time/dates from their list.

**Size**: medium

**Points**: 3

**Assigned to**: Joshua Swaida

## Notify Invited Users and Availability Submission

After creating the event and specifying the invitees, this feature will send a notification to the invitees. These notifications will link to a form that inquires the invitees for their availability. The invitee will view the initial days and time ranges specified by the inviter and select when they are available during those times. 
**NOTE**: for milestone 3, only the UI will be implemented. The rest will be completed in the backend.

### Send Notifications

**Size**: medium

**Points**: 3

**Assigned to**: William Ward

### Collect User's Available Times
**Size**: small

**Points**: 1

**Assigned to**: William Ward

## Event Modification and Deletion

This feature will allow the user (creator of event) to edit or cancel an existing event. The can modify event details like name, description, and times/days. 

**Assigned to**: Noah Vo

### Modify Event Name/Description

This feature allows the user to modify the name and description of an event.

**Size**: small

**Points**: 1

**Assigned to**: Noah Vo

### Modify Times/Days

This feature allows the user to modify the potential times/days of an event.

**Size**: medium

**Points**: 2

**Assigned to**: Noah Vo

### Cancel Event Button

This feature allows the user to cancel the event. 

**Size**: small

**Points**: 1

**Assigned to**: Noah Vo

### Notifications to Invitees

After event cancellation, a notification will be sent to the invitees to inform them of the cancellation. Moreover, this feature will also allow the user to invite additional people to the event, so invitation notifications will be sent to these additional invitees.

**Size**: medium

**Points**: 2

**Assigned to**: Noah Vo

## Event Day/Time Finalization

The inviter will receive a notification after all the invitees have inputted their availability. This notification will have a button that redirects the user to the Event Day/Time Finalization view, where they can view the aggregated invitee availability data. 
This feature will aggregate the invitee availability data and generate a list of all the days/times in which everyone is available. Using this list, the event creator will choose the final day/time of the event.

### Filtering

**Size**: medium

**Points**: 2

**Assigned to**: Bach Luu

### Sorting/Prioritization

**Size**: medium

**Points**: 2

**Assigned to**: Bach Luu

### Detail Information
**Size**: medium

**Points**: 2

**Assigned to**: Bach Luu

## Event Dashboard

Users will be able to view all the events they created and were invited to. They will be able to view past events and upcoming events. Each event on the dashboard will have an edit button that opens the Event Modification/Deletion Screen. The dashboard will update whenever an event is created, modified, or deleted. 

**Size**: Large

**Points**: 4

**Assigned to**: Bach Luu

## Friends List

This feature will allow users to search for other users and add them to their friends list. This will facilitate the invitation process, as you can simply invite people from your friends list. 

### User Search Functionality

This feature allows the user to search for other user's.

**Size**: Large

**Points**: 4

**Assigned to**: Alisha Srivastava

### Add Friend Request

This feature is a button that allows users to send friend requests to specific users.

**Size**: small

**Points**: 1

**Assigned to**: Alisha Srivastava

### Remove Friend Option

This feature is a button that allows users to remove people from their friends list.

**Size**: small

**Points**: 1

**Assigned to**: Alisha Srivastava

### Friend Request Notifications

After clicking the "send friend request" button, this feature will send a friend request notification. 

**Size**: medium

**Points**: 2

**Assigned to**: Alisha Srivastava

### Friends List Display

This feature will display all of the user's friends.

**Size**: medium

**Points**: 3

**Assigned to**: Alisha Srivastava

## Profile Settings

This feature will allow the user to edit/update their profile settings. The user can set their name, email, primary time zone, secondary time zone, and notification preferences (emails or no emails).

### Personal Information Form

This feature will allow users to enter their personal information (name, email).

**Size**: small

**Points**: 1

**Assigned to**: Tan Le

### Time Zone Settings Form

This feature will allow users to enter their time zone settings (primary time zone, secondary time zone).

**Size**: small

**Points**: 1

**Assigned to**: Tan Le

### Notification Settings

This feature will allow users to enter their notification settings (toggle button: emails or no emails).

**Size**: medium

**Points**: 3

**Assigned to**: Tan Le

### Save Button and Direct back to Dashboard

This button will save the user's updated settings and redirect them back to the Dashboard view

**Size**: medium

**Points**: 2

**Assigned to**: Tan Le

## Navigation Bar

This feature will allow the user to switch between the following views of the application: User Authentication Screen, Main Dashboard Screen, Event Creation Screen, Profile Setting Screen, Friends List Screen. These views will be accessible through a button on the navigation bar. 

### Home Button

This button on the navigation bar will open the Homepage view.

**Size**: small

**Points**: 1

**Assigned to**: Bach Luu

### Dashboard Button

This button on the navigation bar will open the Dashboard view.

**Size**: small

**Points**: 1

**Assigned to**: Bach Luu

### Event Creation Button

This button on the navigation bar will open the Event Creation view.

**Size**: small

**Points**: 1

**Assigned to**: Bach Luu

### Profile Settings Button

This button on the navigation bar will open the Profile Settings view.

**Size**: small

**Points**: 1

**Assigned to**: Joshua Swaida

### Friends List Button

This button on the navigation bar will open the Friends List view.

**Size**: small

**Points**: 1

**Assigned to**: Alisha Srivastava


