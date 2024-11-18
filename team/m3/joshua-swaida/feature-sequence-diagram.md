The feature I will focus on here is my InteractiveTimesList. This is a sub-feature to the EventCreationComponent. For this feature, the user will enter in the start time, end time, and date inputs and click the "Add Time" button. This button click will lead to the input being validated to ensure it is in the correct formats (HH:MM for time and YYYY-MM-DD for date). After the time inputs are validated, a new list element will be created and added to the DOM. This will display the potential time/date on the screen. A delete button corresponding to the list item will also be displayed on the DOM. If the user clicks this delete button, the corresponding list item will be removed from the DOM.

```mermaid
graph TD;
    A[User inputs start time]-->D[User clicks Add Time button];
    B[User inputs end time]-->D;
    C[User inputs date]-->D;
    D-->E[handleAddTime method is called with startTime, endTime, and date as parameters]
    E-->F[validateTimeInputs method is called with startTime, endTime, and date as parameters. Time inputs are validated for completeness and correctness of format]
    F-->G[If time inputs are valid, a new li element is created for the time/date. The li contains a delete button]
    F-->H[If time inputs are NOT valid, an alert appears and tells user to fix their input]
    G-->I[clearTimeInputs method is called, resetting all the time input fields to be empty]
    G-->J[List item and corresponding delete button are added to the DOM and displayed on the user's screen]
    J-->K[If user clicks Delete button, the List Item is removed from the DOM]
```
