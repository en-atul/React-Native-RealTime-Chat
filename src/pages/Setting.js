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
} from 'react-native';

import {connect} from 'react-redux';

import {useSelector, useDispatch} from 'react-redux';
import {store} from '../redux/store';
import {logoutUser} from '../redux/actions';
import Icon from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-picker';
import Iconn from 'react-native-vector-icons/FontAwesome5';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
const db = firebase.firestore();

function Login(props) {
  const {navigation} = props;

  const {user} = useSelector((state) => state.settings);

  const dispatch = useDispatch();

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('main');
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress');
    };
  }, [navigation]);

  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const selectImage = () => {
    ImagePicker.showImagePicker(options, async (response) => {
      //console.log('Response = ', response.data);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        //console.log(source);
        // You can also display the image using data:
        const source = {uri: 'data:image/jpeg;base64,' + response.data};
        console.log(source.uri);

        const cityRef = db.collection('users').doc(user.username);

        const res = await cityRef.update({imgUrl: source.uri});
        console.log(res);
        if (res === null) {
          const cityRef = db.collection('users').doc(user.username);
          const doc = await cityRef.get();
          if (doc.exists) {
            store.dispatch({type: 'USER_INFO', payload: doc.data()});
            console.log('updated', doc.data());
          } else {
          }
        }
      }
    });
  };

  const [visible, setVisible] = React.useState(false);

  const color = '#fff';
  const bg2 = '#f7f7f7';
  const header = '#1a237e';

  return (
    <View style={styles.container}>
      <View style={[styles.header, {backgroundColor: header}]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.goBack()}
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          <Icon name="chevron-small-left" size={30} color="#fff" />
        </TouchableOpacity>
        <View
          style={{
            width: '80%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginLeft: 0,
          }}>
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
              Settings
            </Text>
          </View>
        </View>
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
        <View
          style={{
            width: '100%',
            height: 80,
            backgroundColor: '#fff',
            marginTop: 5,
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '25%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={selectImage}
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#f0f0f3',
                borderRadius: 100,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {user.imgUrl !== '' ? (
                <Image
                  source={{uri: user.imgUrl}}
                  style={{width: 60, height: 60}}
                />
              ) : (
                <Iconn name="user-circle" color="#ccc" size={45} />
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '75%',
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
              {user.fullname}
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
              {user.username}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => dispatch(logoutUser())}
          style={{
            width: '100%',
            height: 80,
            backgroundColor: '#fff',
            marginTop: 5,
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: 15,
          }}>
          <Text
            style={{fontFamily: 'OpenSans', marginTop: -5, color: '#6b6b6b'}}>
            Logout Your account
          </Text>
          <Text style={{fontFamily: 'OpenSansBold', lineHeight: 25}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
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
