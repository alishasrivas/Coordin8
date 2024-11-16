/**
 * An object containing various message types for task management.
 */
export const Events = {
  NewMeeting: 'NewMeeting',

  LoadMeetings: 'LoadMeetings',
  LoadMeetingsSuccess: 'LoadMeetingsSuccess',
  LoadMeetingsFailure: 'LoadMeetingsFailure',

  StoreMeeting: 'StoreMeeting',
  StoreMeetingSuccess: 'StoreMeetingSuccess',
  StoreMeetingFailure: 'StoreMeetingFailure',

  UnStoreMeetings: 'UnStoreMeetings',
  UnStoreMeetingsSuccess: 'UnStoreMeetingsSuccess',
  UnStoreMeetingsFailure: 'UnStoreMeetingsFailure',

  // View Switching Events:
  SwitchToDashboardView: 'SwitchToDashboardView',
  SwitchToCreateView: 'SwitchToCreateView',
  SwitchToModifyView: 'SwitchToModifyView',
  SwitchToAvailabilityView: 'SwitchToAvailabilityView',
  SwitchToSettingsView: 'SwitchToSettingsView',
  SwitchToAuthenticationView: 'SwitchToAuthenticationView',
  SwitchToFriendsListView: 'SwitchToFriendsListView',
  SwitchToDateFinalizationView: 'SwitchToDateFinalizationView',

  //profile settings event
  // fetchProfileSettings: 'fetchProfileSettings',
  updateProfileSettings: 'updateProfileSettings',
};
