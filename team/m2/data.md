
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

