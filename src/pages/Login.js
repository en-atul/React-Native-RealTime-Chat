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
  Keyboard,
  BackHandler,
  Dimensions,
  ScrollView,
} from 'react-native';

import {TextInput} from 'react-native-paper';
import {Snackbar} from 'react-native-paper';
import {connect} from 'react-redux';

import {Formik, Field} from 'formik';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../redux/actions';

function Login(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('online');
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress');
    };
  }, [navigation]);

  const _onDismissSnackBar = () => setVisible(false);
  const [visible, setVisible] = React.useState(false);

  const initialValues = {
    username: '',
    password: '',
  };

  const validate = (values) => {
    const errors = {};

    if (values.username.trim() === '') {
      errors.username = true;
    }

    if (values.password.trim() === '') {
      errors.password = true;
    }

    return errors;
  };

  const {loading, errors} = useSelector((state) => state.ui);

  const color = '#fff';
  const bg2 = '#f7f7f7';
  const header = '#1a237e';
  const primary = '#1a237e';

  const btnBackground = '#1a237e';

  const border = '#E0E5E8';
  const inputBackground = '#fdfdfd';
  const hightlightColor = '#ccc';
  const disabled = '#eee';
  const underlineColor = '#ef9a9a';

  console.log('screen height', Dimensions.get('screen').height);

  return (
    <View style={styles.container}>
      <View style={[styles.header, {backgroundColor: header}]}>
        <View
          style={{
            width: '80%',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: 18,
              color: color,
              fontFamily: 'OpenSans',
              marginLeft: 15,
            }}>
            Log In
          </Text>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          height: '90%',
          top: '10%',
          backgroundColor: bg2,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
        }}>
        <View
          style={{
            width: '100%',
            height: 40,
            backgroundColor: inputBackground,
            marginTop: 2,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              color: '#6b6b6b',
              fontFamily: 'OpenSans',
              marginLeft: 10,
            }}>
            Log In Into Your Account
          </Text>
        </View>
        <ScrollView
          style={{
            width: '100%',
            height: '100%',
            paddingBottom: 100,
          }}>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={(values, {setSubmitting, resetForm}) => {
              console.log(values);
              dispatch(loginUser(values));
              //resetForm();
              Keyboard.dismiss();
              setSubmitting(false);
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              dirty,
              isValid,
              setFieldValue,
              setFieldTouched,
            }) => (
              <Fragment>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: inputBackground,
                    marginTop: 22,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 50,
                    paddingTop: 22,
                  }}>
                  <TextInput
                    label="Username"
                    placeholder="username"
                    placeholderTextColor="#a5a4a4"
                    value={values.username}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    style={[styles.input, {backgroundColor: inputBackground}]}
                    autoCapitalize="none"
                    theme={{
                      colors: {
                        placeholder: '#999',
                        primary: primary,
                        underlineColor: 'transparent',
                        text: '#6b6b6b',
                      },
                    }}
                    underlineColor={
                      errors.username && touched.username && errors.username
                        ? underlineColor
                        : border
                    }
                  />

                  <TextInput
                    label="Password"
                    placeholder="password"
                    value={values.reg}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    style={{backgroundColor: '#fff', width: '100%'}}
                    style={[styles.input, {backgroundColor: inputBackground}]}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    theme={{
                      colors: {
                        placeholder: '#999',
                        primary: primary,
                        underlineColor: 'transparent',
                        text: '#6b6b6b',
                      },
                    }}
                    underlineColor={
                      errors.password && touched.password && errors.password
                        ? underlineColor
                        : border
                    }
                  />
                </View>

                <View
                  style={{
                    width: '100%',

                    justifyContent: 'center',
                    alignItems: 'center',
                    bottom: 0,
                    marginTop: 20,
                  }}>
                  <TouchableOpacity
                    activeOpacity={dirty && isValid ? 0.5 : 1}
                    onPress={dirty && isValid ? handleSubmit : null}
                    style={{
                      width: '95%',
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: !(dirty && isValid)
                        ? disabled
                        : btnBackground,
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: !(dirty && isValid) ? hightlightColor : '#fff',
                        fontFamily: 'OpenSans',
                      }}>
                      {loading ? 'Logging In' : 'Log In'}
                    </Text>
                    {loading && (
                      <ActivityIndicator
                        color="#fff"
                        size={12}
                        style={{marginLeft: 10, marginTop: 2}}
                      />
                    )}
                  </TouchableOpacity>

                  <View
                    style={{
                      padding: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 20,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontFamily: 'OpenSans', color: '#6b6b6b'}}>
                      Don't have an account?
                    </Text>
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      activeOpacity={1}
                      onPress={() => props.navigation.navigate('signup')}>
                      <Text style={{color: header}}> Signup</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Fragment>
            )}
          </Formik>
        </ScrollView>
      </View>
      <Snackbar
        visible={errors !== '' ? true : false}
        duration={2000}
        onDismiss={_onDismissSnackBar}
        style={styles.snackbar}>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <Text style={{color: '#fff', marginLeft: 5}}>{errors}</Text>
        </View>
      </Snackbar>
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
    height: '10%',
  },
  loginCred: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 60,
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
    backgroundColor: '#fff',
    width: '95%',
    fontSize: 13,
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
