const INITIAL_STATE = {
  foldersToSkip: ['whatsapp audio'],
  theme: 'light',
  user: [],
  loggedIn: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'add_folders_to_skip':
      return {...state, foldersToSkip: action.payload};
    case 'THEME':
      return {...state, theme: action.payload};
    case 'LOGGED_IN':
      return {...state, loggedIn: action.payload};
    case 'USER_INFO':
      return {...state, user: action.payload};
    default:
      return state;
  }
}
