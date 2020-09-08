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
  ActivityIndicator,
  Image,
  Keyboard,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
  ScrollView,
  TextInput,
  Picker,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {Menu, Divider, Provider, Portal} from 'react-native-paper';

function Login(props) {
  const {navigation} = props;

  const {theme, user} = useSelector((state) => state.settings);
  const {recentConv, tony} = useSelector((state) => state.favorite);
  const dat = useSelector((state) => state.favorite);

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={openMenu}>
        <Icon
          name="dots-three-vertical"
          color="#fff"
          size={17}
          style={{position: 'absolute'}}
        />
      </TouchableOpacity>

      <Modal
        isVisible={visible}
        onBackButtonPress={closeMenu}
        onBackdropPress={closeMenu}
        backdropColor="transparent"
        animationIn="slideInRight"
        animationOut="slideOutRight"
        style={{margin: 0}}>
        <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
          <View
            style={{
              width: 150,
              height: 200,
              backgroundColor: '#fff',
              elevation: 3,
              position: 'absolute',
              top: 30,
              right: 5,
              borderRadius: 12,
              overflow: 'hidden',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setVisible(false);
                props.nav('setting');
              }}
              style={{
                width: '100%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'transparent',
                borderBottomColor: '#eee',
              }}>
              <Text style={{fontFamily: 'OpenSansBold', color: '#222'}}>
                settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
