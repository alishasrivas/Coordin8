The feature I will focus on here is my Event Creation Feature. This feature allows the user to fill in Event Details input, Invitee input, and Potential Times input. The event details include event name and evet description. Invitee input involves entering the invitee's email and clicking "Add Invitee" button; the email is validated and, on success, will add the invitee to the InteractiveInviteesList, updating the UI. Potential times input involves entering the start time, end time, and date and clicking "Add Time" button; the time inputs are validated and, on success, will add the time/date data to the InteractiveTimesList, updating the UI. The user can then click the "Create Event" button which will publish the NewMeeting and StoreMeeting events, saving the Event Information in IndexedDB.


```mermaid
sequenceDiagram
    participant User
    participant AddTimeButton
    participant Validation
    participant TimesDOM
    participant InviteButton
    participant InviteesDOM
    participant CreateEventButton
    participant IndexedDB

    %% Adding Times
    User->>AddTimeButton: Enter Time Input and Click "Add Time"
    AddTimeButton->>Validation: Validate Time Inputs (Start, End, Date)
    alt Validation Success
        Validation-->>AddTimeButton: Success
        AddTimeButton->>TimesDOM: Add Time to DOM List
        AddTimeButton->>TimesDOM: Add Delete Button
    else Validation Failure
        Validation-->>User: Show Error Message
    end
    User->>DeleteTimeButton: Click "Delete"
    DeleteTimeButton->>TimesDOM: Remove Time from DOM

    %% Adding Invitees
    User->>InviteButton: Enter Invitee Input and Click "Invite User"
    InviteButton->>Validation: Validate Invitee Email
    alt Validation Success
        Validation-->>InviteButton: Success
        InviteButton->>InviteesDOM: Add Invitee to DOM List
        InviteButton->>InviteesDOM: Add Delete Button
    else Validation Failure
        Validation-->>User: Show Error Message
    end
    User->>DeleteInviteeButton: Click "Delete"
    DeleteInviteeButton->>InviteesDOM: Remove Invitee from DOM

    %% Creating Event
    User->>CreateEventButton: Enter Event Details and Click "Create Event"
    CreateEventButton->>IndexedDB: Save Event (Details, Invitees, Times)
    IndexedDB-->>CreateEventButton: Success
    CreateEventButton->>InviteesDOM: Clear Invitee List from DOM
    CreateEventButton->>TimesDOM: Clear Time List from DOM
```

