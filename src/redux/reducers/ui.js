const INITIAL_STATE = {
  loading: false,
  errors: '',
  refreshing: false,
  message: '',
  loadIncoming: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOADING':
      return {...state, loading: action.payload};
    case 'REFRESH':
      return {...state, refreshing: action.payload};
    case 'LoadIncoming':
      return {...state, loadIncoming: action.payload};
    case 'Message':
      return {...state, message: action.payload};
    case 'ERRORS':
      return {...state, errors: action.payload};

    default:
      return state;
  }
}
