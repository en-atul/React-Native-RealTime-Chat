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
  TouchableOpacity,
  Image,
  BackHandler,
  Dimensions,
  TextInput,
} from 'react-native';
import {debounce} from 'lodash';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import RNMinimizeApp from 'react-native-minimize';

import {useSelector, useDispatch} from 'react-redux';
import {RecentConv} from '../redux/actions';
import Iconn from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/AntDesign';

import Dot from '../dot';
import {FlatList} from 'react-native-gesture-handler';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/database';
import Recent from '../components/Recent';
const db = firebase.firestore();
const db2 = firebase.database();

function Login(props) {
  const {navigation} = props;
  const [search, setSearch] = React.useState(false);
  const [searchedppl, setSearchedPpl] = React.useState([]);

  const {user} = useSelector((state) => state.settings);
  const {allUserDetails, recentConv} = useSelector((state) => state.favorite);

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        console.log('object');

        RNMinimizeApp.minimizeApp();
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  React.useEffect(() => {
    dispatch(RecentConv({user: user.username}));
    // online/offline
    const usersRef = db.collection('users'); // Get a reference to the Users collection;
    const onlineRef = db2.ref('.info/connected'); // Get a reference to the list of connections

    if (user.username) {
      onlineRef.on('value', (snapshot) => {
        if (snapshot.val() === false) {
          return;
        }
        db2
          .ref(`/status/${user.username}`)
          .onDisconnect() // Set up the disconnect hook
          .set('offline') // The value to be set for this key when the client disconnects
          .then(() => {
            // Set the Firestore User's online status to true
            usersRef.doc(user.username).set(
              {
                online: true,
              },
              {merge: true},
            );

            // Let's also create a key in our real-time database
            // The value is set to 'online'
            db2.ref(`/status/${user.username}`).set('online');
          });
      });
    }
  }, []);

  const [visible, setVisible] = React.useState(false);

  const searchppl = debounce((input) => {
    if (input.length > 0) {
      const pattern = `[A-Za-z.\s]*${input.toLowerCase()}[A-Za-z.\s]*`;
      const matchRegEx = new RegExp(pattern);
      const ppl = allUserDetails.filter((data) =>
        matchRegEx.test(data.username.toLowerCase()),
      );

      setSearchedPpl(ppl);
    } else {
      setSearchedPpl('');
    }
    console.log(searchedppl);
  }, 100);

  const color = '#fff';
  const bg2 = '#f7f7f7';
  const header = '#1a237e';

  const searchbarBackground = '#050571';
  const placeholderColor = '#fff';

  return (
    <View style={styles.container}>
      <View style={[styles.header, {backgroundColor: header}]}>
        <View
          style={{
            width: '80%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginLeft: search ? '7%' : 0,
          }}>
          {search ? (
            <View
              style={[styles.input, {backgroundColor: searchbarBackground}]}>
              <Icon name="search1" size={13} color={placeholderColor} />
              <TextInput
                style={{
                  width: '100%',
                  height: '130%',
                  borderRadius: 20,
                  color: '#fff',
                  marginLeft: 5,
                  fontFamily: 'OpenSans',
                }}
                placeholder="search people here"
                selectionColor="#ccc"
                placeholderTextColor={placeholderColor}
                fontSize={13}
                onChangeText={(ppl) => searchppl(ppl)}
              />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: color,
                  fontSize: 21,
                  fontFamily: 'OpenSans',
                  marginLeft: 15,
                }}>
                Chat
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            setSearchedPpl('');
            setSearch(search ? false : true);
          }}
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name={search ? 'close' : 'search1'} color={color} size={20} />
        </TouchableOpacity>
        {!search && (
          <View
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <Dot nav={props.navigation.navigate} />
          </View>
        )}
      </View>

      <View
        style={{
          width: '100%',
          height: Dimensions.get('screen').height - 90,
          top: 90,
          backgroundColor: bg2,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
        }}>
        {searchedppl.length > 0 ? (
          <FlatList
            data={searchedppl}
            renderItem={({item, index}) =>
              item.username !== user.username && (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() =>
                    props.navigation.navigate('user', {name: item.username})
                  }
                  style={{
                    width: '100%',
                    height: 70,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    marginTop: 4,
                  }}>
                  <View
                    style={{
                      width: '20%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {item.imgUrl !== '' ? (
                        <Image
                          source={{uri: item.imgUrl}}
                          style={{width: 50, height: 50, borderRadius: 50}}
                        />
                      ) : (
                        <Iconn name="user-circle" color="#ccc" size={40} />
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      width: '80%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        width: '80%',
                        textAlign: 'left',
                        marginLeft: 15,
                        fontSize: 19,
                        fontFamily: 'sans-serif-medium',
                        color: '#222',
                        textTransform: 'capitalize',
                      }}>
                      {item.fullname}
                    </Text>
                    <Text
                      style={{
                        width: '80%',
                        textAlign: 'left',
                        marginLeft: 17,
                        fontSize: 14,
                        fontFamily: 'OpenSans',
                        color: '#6b6b6b',
                        textTransform: 'capitalize',
                      }}>
                      {item.username}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }
            keyExtractor={(item) => item.username}
          />
        ) : recentConv.length > 0 ? (
          <FlatList
            data={recentConv}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => props.navigation.navigate('user', {name: item})}
                style={{
                  width: '100%',
                  height: 70,
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  marginTop: 2,
                }}>
                <Recent name={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        ) : (
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 14, color: '#6b6b6b', fontFamily: 'OpenSans'}}>
              no chat history
            </Text>
          </View>
        )}
      </View>
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
    height: 45,
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
    borderRadius: 30,
  },
  iconContainer: {
    width: '15%',
    height: 48,
    backgroundColor: '#ecf1f7',
    justifyContent: 'center',
    alignItems: 'center',
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
