# Application Features

## User Account Creation and Authentication

This feature will allow the user login or sign up. The sign up option will allow users to create an account by entering their email and creating a password. They will be prompted to create a username and upload a profile image (profile image is optional). The next step in the account creation process will be to enter in important settings (timezone and notification preferences). The login option will prompt users to enter their username and password. Users will not be able to use any other features of the application prior to logging in. The application will store user data in a database (stored user data will include, username, email, password, and full name). 

**Assigned to**: Tan Le
  
## Event Creation

This feature will allow the user to create an event. They will be able to input event details like duration, location (online/in person), description. The user will enter in the potential days and time range for the event (the exact day and time will be calculated later). The user will be able to invite other users to the event (the inviter will enter in the invitee's username and the application will query the user database and fetch that invitee's information). 

**Assigned to**: Joshua Swaida

## Inviting Users and Availability Submission

After creating the event and inviting other users, this feature will send a notification to the invitees. These notifications will link to a form that inquires the invitees for their availability. The invitee will view the initial days and time ranges specified by the inviter and select when they are available during those times. 

**Assigned to**: William Ward

## Event Modification and Deletion

This feature will allow the user (creator of event) to edit an existing event. The can modify event details like duration, location, description, and times/days. The user can also cancel the event (the cancellation of an event will send a notification to the invitees, informing them of the cancellation). This feature will also allow the user to invite additional people to the event (invitation notifications will be sent to these additional invitees). 

**Assigned to**: Noah Vo

## Event Day/Time Finalization

This feature will aggregate the invitee availability data and generate a list of all the days/times in which everyone is available. Using this list, the event creator will choose the final day/time of the event.

**Assigned to**: Bach Luu

## External Calendar Integration

This feature integrates a user's external calendar (for example, Google Calendar) with this app. After an event date/time is finalized, this feature will allow the user to add the event to their calendar. The feature will display past and future events on the calendar. If an event is cancelled, the calendar updates and removes the event.

**Assigned to**: Alisha Srivastava

## Event Dashboard

Users will be able to view all the events they created and were invited to. They will be able to view past events and upcoming events.  

**Assigned to**: Bach Luu

## Friends List

This feature will allow users to search for other users and add them to their friends list. This will facilitate the invitation process, as you can simply invite people from your friends list.

**Assigned to**: Jonah Willers

## Profile Settings

This feature will allow the user to edit/update their profile settings. The user can set their name, email, primary time zone, secondary time zone, notification preferences (emails or no emails), and calendar integration (user can attach their preferred external calendar to this app - for example, Google Calendar).

**Assigned to**: Jonah Willers
