### Event Finalization Feature

The event finalization feature allows users to finalize an event after all necessary details have been provided. This includes validating the event details, saving the event to the database, and notifying participants.

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    participant NotificationService

    User->>Frontend: Fill in event details
    User->>Frontend: Click "Finalize Event"
    Frontend->>Backend: Send event details
    Backend->>Backend: Validate event details
    alt Validation Success
        Backend->>Database: Save event details
        Database-->>Backend: Confirmation of save
        Backend->>NotificationService: Notify participants
        NotificationService-->>Backend: Notification sent
        Backend-->>Frontend: Event finalized successfully
        Frontend-->>User: Display success message
    else Validation Failure
        Backend-->>Frontend: Return validation errors
        Frontend-->>User: Display error messages
    end