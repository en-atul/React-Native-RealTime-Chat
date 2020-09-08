/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  TextInput,
} from 'react-native';

import {connect} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {store} from '../redux/store';
import Feather from 'react-native-vector-icons/Feather';

function Login(props) {
  const [bottom, setBottom] = React.useState(0);
  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', (e) => {
      console.log('shown', e.endCoordinates.height);
      setBottom(e.endCoordinates.height);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setBottom(0);
    });
  }, []);

  const {user} = useSelector((state) => state.settings);

  const [msg, setMsg] = React.useState('');

  const header = '#1a237e';

  const send = () => {
    const msgBody = {
      sender: user.username,
      recepient: props.name,
      message: msg,
      sendAt: new Date(),
    };
    store.dispatch({type: 'MESSAGE_FROM', payload: msgBody});
    setMsg('');
    axios
      .post('/msg', msgBody)
      .then((res) => {
        console.log('submitted');
      })
      .catch((err) => {});
  };

  return (
    <View
      style={{
        width: '100%',
        height: '9%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: bottom !== 0 ? bottom + 30 : 0,
      }}>
      <TextInput
        multiline={true}
        style={{
          width: '80%',
          height: 50,
          borderColor: 'transparent',
          borderWidth: 1,
          borderRadius: 50,
          backgroundColor: header,
          paddingLeft: 15,
          fontFamily: 'OpenSans',
          color: '#fff',
        }}
        placeholderTextColor="#f7f7f7"
        placeholder="type your message"
        onChangeText={(text) => {
          setMsg(text);
          console.log(text);
        }}
        value={msg}
      />
      <TouchableOpacity
        onPress={send}
        activeOpacity={1}
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
          backgroundColor: header,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Feather name="send" color="#fff" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    top: 0,
    height: 90,
  },

  inputContainer: {
    width: '75%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E5E8',
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#fdfdfd',
  },
  input: {
    width: '100%',
    height: 40,
    textTransform: 'capitalize',
    letterSpacing: 1,
    paddingLeft: 10,
    fontFamily: 'notoserif',
    backgroundColor: '#81a04e',
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    color: '#fff',
  },
  iconContainer: {
    width: '15%',
    height: 48,
    backgroundColor: '#ecf1f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontFamily: 'OpenSans',
    fontSize: 14,
  },

  linearGradient: {
    width: '85%',
    height: 50,
    marginTop: 25,
    borderRadius: 3,
    elevation: 3,
    borderRadius: 5,
  },
  btn: {
    width: '75%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,

    backgroundColor: '#00ACEE',
  },
  snackbar: {
    backgroundColor: '#1a237e',
    elevation: 0,
    width: '100%',
    margin: 0,
    borderBottomColor: 'transparent',
    borderRadius: 0,
  },
  txt: {lineHeight: 22, fontSize: 12, color: '#222', fontFamily: 'OpenSans'},
  continueWith: {
    flexDirection: 'row',
    width: '34%',
    marginBottom: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bttm: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Login.propTypes = {
  // loginUser: PropTypes.func.isRequired,
  // thirdPartyLogin: PropTypes.func.isRequired,
  // noLogin: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  // user: state.user,
  settings: state.settings,
});

const mapActionsToProps = {
  // loginUser,
  // thirdPartyLogin,
  // noLogin,
};
export default connect(mapStateToProps, mapActionsToProps)(Login);
