import moment from 'moment';

const INITIAL_STATE = {
  alluser: [],
  allUserDetails: [],
  recentConv: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ALLUSER':
      return {...state, alluser: action.payload};
    case 'ALL_USER_DETAILS':
      return {...state, allUserDetails: action.payload};
    case 'MESSAGE': {
      console.log('---------from Message------------', action.payload);
      let {sender, message} = action.payload;
      let updatedListt = {...state};
      if (updatedListt[sender] === undefined) {
        return {...state, [action.payload.sender]: action.payload};
      } else {
        const exist = updatedListt[sender].findIndex(
          (data) =>
            data.message.trim() === message.trim() &&
            moment(data.sentAt) === moment(message.sendAt),
        );
        if (exist > 0) {
          updatedListt[sender].map((data) => console.log(data.message));
        } else {
          updatedListt[sender].push(action.payload);
          return {...updatedListt};
        }
      }
    }

    case 'MESSAGE_FROM': {
      let {recepient} = action.payload;
      let ul = {...state};
      console.log('from receipt reducer');
      if (ul[recepient] === undefined) {
        console.log('from receipt reducer undefined');

        return {...state, [action.payload.recepient]: action.payload};
      } else {
        console.log(ul[action.payload.recepient], '-----------', recepient);
        ul[action.payload.recepient].push(action.payload);
        return {...ul};
      }
    }

    case 'MESSAGEE': {
      if (action.payload.length > 0) {
        return {...state, [action.payload[0].sender]: action.payload};
      } else {
        return {...state, [action.payload.name]: action.payload.data};
      }
    }

    case 'RECENT_CONV_HISTORY': {
      return {...state, recentConv: action.payload};
    }
    case 'RECENT_CONV_QUEUE': {
      const i = state.recentConv.findIndex((data) => data === action.apyload);
      if (i < 0) {
        return {...state, recentConv: [...state.recentConv, action.payload]};
      }
    }

    case 'LAST_MESSAGE': {
      let {name, message} = action.payload;
      var nm = `${name}LM`;

      let updatedList = {...state};
      if (updatedList[nm] === undefined) {
        return {...state, [nm]: message};
      } else {
        return {...state, [nm]: message};
      }
    }

    case 'PHOTO': {
      let {name, data} = action.payload;
      var nm = `${name}PHOTO`;

      let updatedList = {...state};
      if (updatedList[nm] === undefined) {
        return {...state, [nm]: data};
      } else {
        return {...state, [nm]: data};
      }
    }

    default:
      return state;
  }
}
