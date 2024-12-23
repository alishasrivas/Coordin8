
# Application Data 

##  Overview

### 1. User Profile

- **Description**: Contains personal information about the user, including login details and preferences.
- **Attributes**:
  - `user_id` (UUID): A unique identifier for each user.
  - `username` (string): The user name for the account.
  - `email` (string): The user's email address.
  - `password` (string): A hashed version of the user's password.
  - `created_at` (timestamp): The date and time when the account was created.
  - `updated_at` (timestamp): The last time the user's profile was updated.
  - `primary time zone` (string): The user's timezone.
  - `secondary time zone` (string): The user's timezone.
  - `notification preference` (boolean): The user's notification preference.
- **Data Source**: User-input data when registering, created_at and updated_at will be auto generated.

### 2. Event
- **Description**: Contains details of 1 event.
- **Attributes**:
  - `event_id` (UUID): A unique identifier for each event.
  - `Title` (string): The event title.
  - `Description` (string): The event description.
  - `Event Time` (timestamp): The finalized time of the event .
  - `File attachment` (File): The event file attachment (if any).
  - `organizer_id` (UUID): The ID of the user who created the event.
  - `created_at` (timestamp): The date and time when the event was created.
  - `updated_at` (timestamp): The last time the event was updated.
- **Data Source**: Inviter input data when creating or editing an event, created_at and updated_at will be auto generated.

### 3. Event Participant
- **Description**: Contains details of 1 event participant, which will also include the organizer.
- **Attributes**:
  - `id` (UUID): The ID of the event participant model instance.
  - `event_id` (UUID): The ID of the event that partipant is in.
  - `user_id` (UUID): The ID of the participant.
  - `created_at` (timestamp): The date and time when the instance was created.
  - `updated_at` (timestamp): The last time the instance was updated.
  - `Event time preference` (timestamp): The event time chosen by participants.
- **Data Source**: event-id and user-id will be auto generated when user accepts invitation or create the event. Event time chosen will be input of user. created_at and updated_at will be auto generated.

### 4. Inivitation
- **Description**: Contains details of an invitation from an organizer of an event to a participant. 
- **Attributes**:
  - `id` (UUID): The ID of the invitation.
  - `event_id` (UUID): The ID of the event that user is invited to.
  - `user_id` (UUID): The ID of the inviteed.
  - `created_at` (timestamp): The date and time when the invitation was created.
  - `updated_at` (timestamp): The last time when the invitation was updated.
- **Data Source**: created_at and updated_at will be auto generated. The other attributes will be user input data from the inviter.

## Data Relationships

- **User to Event**: One-to-many relationship (this represent the organizer and his/ her events, an organizer can have many events).
- **User to Event Participant**: One-to-many relationship (a user can be associated with multiple events as a participant).
- **Event to Event Participant**: One-to-many relationship (an event can have multiple participants).
- **User to Invitation**: One-to-many relationship (a user can receive multiple invitations).
- **Event to Invitation**: One-to-many relationship (an event can have multiple invitations associated with it).

## Data Sources
- **System-Generated Data**: all created_at and updated_at will be auto generated by system (the time they are created or updated). Event and User in Event Participant will be auto generated by system.
- **User-Input Data**: All other data will be user input data. This will either come from input from a form or input from choosing times on a calendar.