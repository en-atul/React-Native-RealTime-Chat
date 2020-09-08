import axios from 'axios';
import moment from 'moment';
export const allUser = () => async (dispatch) => {
  axios
    .get('/alluser')
    .then((res) => {
      dispatch({type: 'ALLUSER', payload: res.data.data});
    })
    .catch((err) => {});
};

export const allUserDetails = () => async (dispatch) => {
  axios
    .get('/allUserDetails')
    .then((res) => {
      dispatch({type: 'ALL_USER_DETAILS', payload: res.data.data});
    })
    .catch((err) => {});
};

export const RecentConv = (data) => async (dispatch) => {
  axios
    .post('/user', data)
    .then((res) => {
      dispatch({type: 'RECENT_CONV_HISTORY', payload: res.data.data});
    })
    .catch((err) => {});
};
