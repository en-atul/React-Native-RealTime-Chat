import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';
import NavDrawer from '../routes/Drawer';

import {allUser, allUserDetails} from '../redux/actions';
function Container() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 200);
    dispatch(allUser());
    dispatch(allUserDetails());
  }, []);
  const theme = 'light';
  const bc = theme === 'light' ? '#1a237e' : '#1d1d1d';
  const bar = 'light-content';
  return (
    <View
      style={{
        flex: 1,
      }}>
      <StatusBar backgroundColor={bc} barStyle={bar} />

      <NavDrawer />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#121212',
    padding: 10,
    fontSize: 22,
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default Container;
