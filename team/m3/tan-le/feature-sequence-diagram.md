Flow chart for authentication to profile settings page. 

Note: the part I am mainly responsible for is very back-end oriented, so my flow chart will contain certain parts related to back-end, which is not implemented in this milesonte. However, I also contributed to other features of my teammate for this milestone, but since I am not mainly responsible for that, I cannot choose to draw them.



```mermaid
graph TD;
    A[sign up] --> B[email and password validation on front end];
    B --> C[email and password sent to backend, backend perform hash operation to store password securely]
    B --> D[UI changes to the Set Up Component Screen]
    D --> E[user input email notification preference, username, primary time zone preference]
    E --> F[backend receive user input and store in database]
    E --> G[UI changes to dashboard]
    G --> H[user click on profile settings]
    H --> I[currently, we implement this with indexedDB -assume storing user data in indexedDB instead of backend -; system fetchs user data from indexedDB and display in the profile settings page]
    I --> J[user data with email, username, primary time zone, secondary time zone, notification preference are displayed in the profile settings form]
    J --> K[user can update email, username, primary time zone, secondary time zone, notification preference in the form]
    K --> L[if user submits, there will be a simple validation checking if all required fields are not empty - email, username, first time zone preference ]
    L --> M[if passed, system will store the information in indexedDB]
    L --> N[if failed, system will display error message to user, user may enter input again; if user refreshes the page, the error message will be gone, and information from indexedDB will be displayed again]
    M --> O[User can move back to dashbaord or stay at profile settings page]
    N --> O


```