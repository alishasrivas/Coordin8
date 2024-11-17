# Application Features

## User Account Creation and Authentication

This feature will allow the user login or sign up. The sign up option will allow users to create an account by entering their email and creating a password. They will be prompted to create a username and upload a profile image (profile image is optional). The next step in the account creation process will be to enter in important settings (timezone and notification preferences). The login option will prompt users to enter their username and password. Users will not be able to use any other features of the application prior to logging in. The application will store user data in a database (stored user data will include, username, email, password, and full name). 

### Log-In Form
**Size**: small

**Points**: 1

**Assigned to**: Tan Le

### Sign-Up Form
**Size**: small

**Points**: 1

**Assigned to**: Tan Le

### Username, timezone, notification preferences form after signing up
**Size**: small

**Points**: 1

**Assigned to**: Tan Le
  
## Homepage

A static HTML page that provides information about the application. It includes headings, paragraphs, and lists, but no dynamic elements or data interaction. It’s a straightforward presentation of information without requiring user input.

**Size**: small

**Points**: 1

**Assigned to**: Joshua Swaida


## Event Creation

This feature will allow the user to create an event. They will be able to input event details like duration, location (online/in person), description. The user will enter in the potential days and time range for the event (the exact day and time will be calculated later). The user will be able to invite other users to the event (the inviter will enter in the invitee's username and the application will query the user database and fetch that invitee's information). 

### Event Creation Form (name, description, invitees, potential times)
**Size**: medium

**Points**: 3

**Assigned to**: Joshua Swaida

### Interactive Invitees List
**Size**: medium

**Points**: 3

**Assigned to**: Joshua Swaida

### Interactive Times List
**Size**: medium

**Points**: 3

**Assigned to**: Joshua Swaida

## Notify Invited Users and Availability Submission

After creating the event and inviting other users, this feature will send a notification to the invitees. These notifications will link to a form that inquires the invitees for their availability. The invitee will view the initial days and time ranges specified by the inviter and select when they are available during those times. 

### Send Notifications
**Size**: medium

**Points**: 3

**Assigned to**: William Ward

### Collect User's Available Times
**Size**: small

**Points**: 1

**Assigned to**: William Ward

## Event Modification and Deletion

This feature will allow the user (creator of event) to edit an existing event. The can modify event details like duration, location, description, and times/days. The user can also cancel the event (the cancellation of an event will send a notification to the invitees, informing them of the cancellation). This feature will also allow the user to invite additional people to the event (invitation notifications will be sent to these additional invitees).

### Modify Duration
**Size**: small

**Points**: 1

**Assigned to**: Noah Vo

### Modify Description
**Size**: small

**Points**: 1

**Assigned to**: Noah Vo

### Modify Times/Days
**Size**: medium

**Points**: 2

**Assigned to**: Noah Vo

### Cancel Event Button
**Size**: small

**Points**: 1

**Assigned to**: Noah Vo

### Notifications to Invitees
**Size**: medium

**Points**: 2

**Assigned to**: Noah Vo

## Event Day/Time Finalization

The inviter will be sent a notification when all the invitees have inputted their availability. This notification will have a button that redirects the user to the Event Day/Time Finalization view, where they can view the aggregated invitee availability data. 
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

Users will be able to view all the events they created and were invited to. They will be able to view past events and upcoming events.  

### List View
**Size**: Large

**Points**: 4

**Assigned to**: Bach Luu

## Friends List

This feature will allow users to search for other users and add them to their friends list. This will facilitate the invitation process, as you can simply invite people from your friends list.

### User Search Functionality
**Size**: Large

**Points**: 4

**Assigned to**: Alisha Srivastava

### Add Friend Request
**Size**: small

**Points**: 1

**Assigned to**: Alisha Srivastava

### Remove Friend Option
**Size**: small

**Points**: 1

**Assigned to**: Alisha Srivastava

### Friend Request Notifications
**Size**: medium

**Points**: 2

**Assigned to**: Alisha Srivastava

### Friends List Display
**Size**: medium

**Points**: 3

**Assigned to**: Alisha Srivastava

## Profile Settings

This feature will allow the user to edit/update their profile settings. The user can set their name, email, primary time zone, secondary time zone, notification preferences (emails or no emails), and calendar integration (user can attach their preferred external calendar to this app - for example, Google Calendar).

### Personal Information Form
**Size**: small

**Points**: 1

**Assigned to**: Tan Le

### Time Zone Settings Form
**Size**: small

**Points**: 1

**Assigned to**: Tan Le

### Notification Settings
**Size**: medium

**Points**: 3

**Assigned to**: Tan Le

### Save Button and Direct back to Dashboard
**Size**: medium

**Points**: 2

**Assigned to**: Tan Le

## Navigation Bar

This feature will allow the user to switch between the following views of the application: User Authentication Screen, Main Dashboard Screen, Event Creation Screen, Profile Setting Screen, Friends List Screen. These views will be accessible through a button on the navigation bar. 

### Home Button
**Size**: small

**Points**: 1

**Assigned to**: Bach Luu

### Dashboard Button
**Size**: small

**Points**: 1

**Assigned to**: Bach Luu

### Event Creation Button
**Size**: small

**Points**: 1

**Assigned to**: Bach Luu

### Profile Settings Button
**Size**: small

**Points**: 1

**Assigned to**: Joshua Swaida

### Friends List Button
**Size**: small

**Points**: 1

**Assigned to**: Joshua Swaida


