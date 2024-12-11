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
  SwitchToDateFinalizationView: 'SwitchToDateFinalizationView',

  //profile settings event
  // fetchProfileSettings: 'fetchProfileSettings',
  updateProfileSettings: 'updateProfileSettings',
  fetchProfileSettings: 'fetchProfileSettings',

  //user availability events
  UserAvailabilitySubmission: 'UserAvailabilitySubmission',

  //Authentication Events
  LogIn: 'LogIn',
  LogInSuccess: 'LoginSucess', //change from Log in page to home page
  LogOutSuccess: 'LogOutSucess', //change from home page to log in page
  LogOut: 'LogOut',
  Register: 'Register',
  EventUpdate: "EventUpdate",

  //Switching between Register and LogIn View
  LogInToRegister: 'LogInToRegister',
  RegisterToLogIn: 'RegisterToLogIn',

  //Error handling events for profile settings
  DuplicateUser: 'DuplicateUser',

  //Error handling for authentication events
  BackEndLogInFailure: 'BackEndLogInFailure',
  RegisterBackEndFailure: 'RegisterBackEndFailure',


};
