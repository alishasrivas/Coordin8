
# Application Data 

##  Overview

### 1. User Profile

- **Description**: Contains personal information about the user, including login details and preferences.
- **Attributes**:
  - `user_id` (UUID): A unique identifier for each user.
  - `name` (string): The user's full name.
  - `email` (string): The user's email address.
  - `password` (string): A hashed version of the user's password.
  - `created_at` (timestamp): The date and time when the account was 
    created.
  - `updated_at` (timestamp): The last time the user's profile was updated.
- **Data Source**: User-input data when registering.

### 2. Event
TODO: how to include the time choices of each person?
- **Description**: Contains details of 1 event.
- **Attributes**:
  - `event_id` (UUID): A unique identifier for each event.
  - `Title` (string): The event title.
  - `Description` (string): The event description.
  - `Event Time` (timestamp): The finalized time of the event .
  - `File attachment` (string): The event file attachment (if any).
  - `People Involved` (Array<User Profile>): List of people involved in the event.
  - `created_at` (timestamp): The date and time when the event was created.
  - `updated_at` (timestamp): The last time the event was updated.
- **Data Source**: Inviter input data when creating or editing an event.



