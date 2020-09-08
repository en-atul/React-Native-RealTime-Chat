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
  Text,
  Image,
  Keyboard,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import moment from 'moment';

import {connect} from 'react-redux';

import {useSelector, useDispatch} from 'react-redux';
import Iconn from 'react-native-vector-icons/FontAwesome5';
import {store} from '../redux/store';
import Input from '../components/Input';
import {FlatList} from 'react-native-gesture-handler';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
const db = firebase.firestore();

function Login(props) {
  const {navigation} = props;
  const [bottom, setBottom] = React.useState(0);

  var scrollView = React.createRef();
  const dispatch = useDispatch();
  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', (e) => {
      console.log('shown', e.endCoordinates.height);
      setBottom(e.endCoordinates.height);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setBottom(0);
    });

    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('main');
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress');
    };
  }, [navigation]);
  const [online, setOnline] = React.useState(false);

  const {user} = useSelector((state) => state.settings);
  const dat = useSelector((state) => state.favorite);

  React.useEffect(() => {
    userdata();
  }, []);

  const userdata = async () => {
    const cityRef = db.collection('users').doc(props.route.params.name);
    const doc = await cityRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }

    db.collection('users')
      .doc(props.route.params.name)
      .onSnapshot(function (doc) {
        if (doc.data().online) {
          setOnline(true);
        } else {
          setOnline(false);
        }

        if (doc.data().imgUrl) {
          console.log('updating.................');
          store.dispatch({
            type: 'PHOTO',
            payload: {
              name: props.route.params.name,
              data: doc.data().imgUrl,
            },
          });
        }
      });

    dat[props.route.params.name] === undefined &&
      db
        .collection(`message/${user.username}/${props.route.params.name}`)
        .orderBy('sendAt', 'asc')
        .get()
        .then(function (qs) {
          const data = [];
          qs.forEach(function (doc) {
            data.push(doc.data());
          });
          console.log('data', data);
          if (data.length === 0) {
            store.dispatch({
              type: 'MESSAGEE',
              payload: {
                name: props.route.params.name,
                data: data,
              },
            });
          } else {
            store.dispatch({
              type: 'MESSAGEE',
              payload: data,
            });
          }
        });

    // console.log(db);
    let flag = false;

    dat[props.route.params.name] &&
      db
        .collection(`message/${user.username}/${props.route.params.name}`)
        .onSnapshot((querySnapshot) => {
          querySnapshot.docChanges().forEach((change) => {
            if (!flag) {
              console.log('');
              return;
            }
            if (change.type === 'added') {
              console.log('added---: ', change.doc.data());
              store.dispatch({
                type: 'MESSAGE',
                payload: change.doc.data(),
              });
            }
            if (change.type === 'modified') {
              //console.log('Modified city: ', change.doc.data());
            }
            if (change.type === 'removed') {
              //console.log('Removed city: ', change.doc.data());
            }
          });
          if (!flag) {
            flag = true;
          }
        });
  };

  const color = '#fff';
  const bg2 = '#f7f7f7';
  const header = '#1a237e';

  const time = (time) => {
    return moment(time).calendar();
  };
  console.log('pppppppppppppppppppppp', dat[props.route.params.name]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={[styles.header, {backgroundColor: header}]}>
        <View
          style={{
            width: '80%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 15,
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
            {dat[props.route.params.name + 'PHOTO'] ? (
              <Image
                source={{uri: dat[props.route.params.name + 'PHOTO']}}
                style={{width: 50, height: 50}}
              />
            ) : (
              <Iconn name="user-circle" color="#fff" size={35} />
            )}
          </View>
          <View
            style={{
              alignItems: 'center',

              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                color: color,
                fontSize: 21,
                fontFamily: 'OpenSans',
                textTransform: 'capitalize',
                marginLeft: 15,
              }}>
              {props.route.params.name}{' '}
            </Text>
            <Text
              style={{
                color: color,
                fontSize: 9,
                fontFamily: 'OpenSans',
                textTransform: 'capitalize',
              }}>
              {online && 'online'}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          height: Dimensions.get('window').height - 90,
          top: 90,
          backgroundColor: bg2,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
        }}>
        <View
          style={{
            width: '100%',
            height: bottom === 0 ? '91%' : bottom - 20,
          }}>
          {dat[props.route.params.name] !== undefined && (
            <FlatList
              ref={(ref) => (scrollView = ref)}
              onContentSizeChange={(contentWidth, contentHeight) => {
                scrollView.scrollToEnd({animated: true});
              }}
              data={dat[props.route.params.name]}
              renderItem={({item, index}) => (
                <View
                  key={index}
                  activeOpacity={1}
                  style={{
                    width: '100%',
                    alignItems:
                      item.sender === user.username ? 'flex-start' : 'flex-end',

                    justifyContent: 'center',
                    marginTop: 5,
                    marginBottom:
                      index === dat[props.route.params.name].length - 1 ? 5 : 0,
                  }}>
                  <View
                    style={{
                      maxWidth: '60%',
                      backgroundColor: '#fff',

                      padding: 7,
                      paddingLeft: 10,
                      paddingRight: 12,
                      borderRadius: 5,
                      marginRight: item.sender === user.username ? 0 : 7,
                      marginLeft: item.sender === user.username ? 7 : 0,
                    }}>
                    <Text
                      style={{
                        textAlign: 'left',
                        fontSize: 14,
                        fontFamily: 'OpenSans',
                        color: '#222',
                        textTransform: 'capitalize',
                      }}>
                      {item.message}
                    </Text>

                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: 'OpenSans',
                        color: '#6b6b6b',
                        right: 0,
                        textAlign: 'right',
                        marginTop: 3,
                      }}>
                      {time(item.sendAt)}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={(item) =>
                item.sendAt + item.message + Math.random()
              }
            />
          )}
        </View>

        <Input name={props.route.params.name} />
      </View>
    </KeyboardAvoidingView>
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
