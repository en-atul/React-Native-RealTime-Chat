/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import {connect} from 'react-redux';
import {useSelector} from 'react-redux';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import moment from 'moment';
import {store} from '../redux/store';
import Icon from 'react-native-vector-icons/FontAwesome5';
const db = firebase.firestore();

function Login(props) {
  const [online, setOnline] = React.useState(false);

  React.useEffect(() => {
    checkUpdate();

    lastMessage();
  }, []);
  const {user} = useSelector((state) => state.settings);
  const dat = useSelector((state) => state.favorite);

  const checkUpdate = () => {
    db.collection('users')
      .doc(props.name)
      .onSnapshot(function (doc) {
        if (doc.data().online !== undefined) {
          if (doc.data().online) {
            setOnline(true);
          } else {
            setOnline(false);
          }
        }

        if (doc.data().imgUrl !== '') {
          console.log('updating.................');
          store.dispatch({
            type: 'PHOTO',
            payload: {
              name: props.name,
              data: doc.data().imgUrl,
            },
          });
        } else {
          store.dispatch({
            type: 'PHOTO',
            payload: {
              name: props.name,
              data: '',
            },
          });
        }
      });
  };

  const lastMessage = async () => {
    const results = [];
    const results2 = [];

    const f = await db
      .collection(`message/${user.username}/${props.name}`)
      .orderBy('sendAt', 'asc')
      .get();
    f.forEach(function (doc) {
      results.push(doc.data());
    });

    const g = await db
      .collection(`message/${props.name}/${user.username}`)
      .orderBy('sendAt', 'asc')
      .get();
    g.forEach(function (doc) {
      results2.push(doc.data());
    });

    if (results.length > 0 && results2.length > 0) {
      if (
        moment(results2[results2.length - 1].sendAt) >
        moment(results[results.length - 1].sendAt)
      ) {
        store.dispatch({
          type: 'LAST_MESSAGE',
          payload: {message: results2[results2.length - 1], name: props.name},
        });
      } else {
        store.dispatch({
          type: 'LAST_MESSAGE',
          payload: {message: results[results.length - 1], name: props.name},
        });
      }
    } else if (results.length === 0 && results2.length > 0) {
      store.dispatch({
        type: 'LAST_MESSAGE',
        payload: {message: results2[results2.length - 1], name: props.name},
      });
    } else if (results2.length === 0 && results.length > 0) {
      store.dispatch({
        type: 'LAST_MESSAGE',
        payload: {message: results[results.length - 1], name: props.name},
      });
    } else {
    }
  };

  return (
    <>
      <View
        style={{
          width: '18%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            overflow: 'hidden',
          }}>
          {dat[props.name + 'PHOTO'] ? (
            <Image
              source={{uri: dat[props.name + 'PHOTO']}}
              style={{width: 50, height: 50}}
            />
          ) : (
            <Icon name="user-circle" color="#ccc" size={35} />
          )}
        </View>
      </View>
      <View style={{width: '82%', height: '100%'}}>
        <Text
          style={{
            width: '80%',
            textAlign: 'left',
            marginLeft: 15,
            fontSize: 19,
            fontFamily: 'OpenSansBold',
            color: '#222',
            textTransform: 'capitalize',
            marginTop: 5,
          }}>
          {props.name}
        </Text>
        {dat[props.name + 'LM'] !== undefined && (
          <>
            <Text
              style={{
                fontSize: 13,
                color: '#6b6b6b',
                marginLeft: 15,
                fontFamily: 'OpenSans',
                width: '80%',
                marginTop: 3,
              }}
              numberOfLines={1}>
              {dat[props.name + 'LM'].message}
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: '#222',

                textAlign: 'right',
                position: 'absolute',
                top: 7,
                right: 10,
              }}>
              {moment(dat[props.name + 'LM'].sendAt).calendar()}
            </Text>
          </>
        )}
        {online && (
          <View
            style={{
              width: 5,
              height: 5,
              borderRadius: 50,
              backgroundColor: '#43e14a',
              position: 'absolute',
              right: 10,
              bottom: 10,
            }}></View>
        )}
      </View>
    </>
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
