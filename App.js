import * as React from 'react';
import {createSwitchNavigation,createAppContainer} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import DashboardScreen from './screens/DashboardScreen';
import * as firebase from 'firebase';
import { firebaseConfig } from './config';

if(!firebase.app.length){
  firebase.intializeApp(firebaseConfig);
}else{
  firebase.app();
}

const AppSwitchNavigator=createSwitchNavigation({
  LoadingScreen:LoadingScreen,
  LoginScreen:LoginScreen,
  DashboardScreen:DashboardScreen
})

const AppNavigator=createAppContainer(AppSwitchNavigator);

export default function App() {
  return (
    <AppNavigator/>
  );
}

