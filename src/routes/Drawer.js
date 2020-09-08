/**atul15r
 * React Native Music Player
 * https://github.com/atul15r
 *7 Aug 2020
 * @format
 * @flow
 */

import * as React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {NavigationContainer, useFocusEffect} from '@react-navigation/native';

import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Main from '../pages/Main';
import User from '../pages/User';
import Setting from '../pages/Setting';

import Ion from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

function MyDrawer() {
  const theme = 'light';
  const {loggedIn} = useSelector((state) => state.settings);
  const bg = theme === 'dark' ? '#0e0e0e' : '#fdfdfd';
  const drawerbg = theme === 'dark' ? '#000' : '#fff';
  const active = theme === 'dark' ? '#ccc' : '#1a237e';
  const fullBack = theme === 'dark' ? '#0e0e0e' : '#00000000';
  const bg2 = theme === 'dark' ? '#ccc' : '#1a237e';
  const border = theme === 'dark' ? '#191818' : '#f0f0f3';
  const inactive = theme === 'dark' ? '#414141' : '#b9b9b9';

  const screenOptions = {
    ...TransitionPresets.ModalPresentationIOS,
    gestureEnabled: true,
    cardOverlayEnabled: true,
  };

  function CreateStack(props) {
    return (
      <>
        <Stack.Navigator
          headerMode="none"
          mode="modal"
          screenOptions={{
            animationEnabled: false,
            cardStyle: {backgroundColor: 'transparent'},
          }}
          initialRouteName="main">
          <Stack.Screen name="main" component={Main} />
          <Stack.Screen
            name="user"
            component={User}
            options={{
              animationEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="setting"
            component={Setting}
            options={{
              animationEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        </Stack.Navigator>
      </>
    );
  }

  function Cred(props) {
    return (
      <>
        <Stack.Navigator
          headerMode="none"
          mode="modal"
          screenOptions={{
            animationEnabled: false,
            cardStyle: {backgroundColor: 'transparent'},
          }}
          initialRouteName="login">
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={Signup} />

          {/* <Stack.Screen
            name="Modal"
            component={Modal}
            options={{
              animationEnabled: true,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          /> */}
        </Stack.Navigator>
      </>
    );
  }

  return (
    <>
      <NavigationContainer>
        {loggedIn ? <CreateStack /> : <Cred />}
      </NavigationContainer>
    </>
  );
}

export default MyDrawer;
