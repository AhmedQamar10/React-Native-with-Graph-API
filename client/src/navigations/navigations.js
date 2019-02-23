import React, { Component } from 'react';
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import { Keyboard, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/EvilIcons'

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AuthenticationScreen from '../screens/AuthenticationScreen';
import NewTweetScreen from '../screens/NewTweetScreen';

const Tabs = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerTitle: 'Home',
        tabBarIcon: ({ tintColor }) =>
          <Icon size={20} color={tintColor} name="home" />,
      }),
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        headerTitle: 'Profile',
        tabBarIcon: ({ tintColor }) =>
          <Icon size={20} color={tintColor} name="user" />,
      }),
    }
  },
  {
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled:false,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: '#0984e3',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: '#fff',
        height: 50,
        paddingVertical: 5,
      },
    },
  },
);

const NewTweetModal = StackNavigator(
  {
    NewTweet: {
      screen: NewTweetScreen,

      navigationOptions: ({ navigation }) => ({
        headerRight: (
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              navigation.goBack(null);
            }}
            hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} side="right"
            style={{
              justifyContent: 'center', alignItems: 'center',
              marginRight: 15
            }}>
            <Icon2 color='blue' name='close' size={35} />
          </TouchableOpacity>
        ),
      }),

    },
  },
);
const AppMainNav = StackNavigator(
  {
    Home: {
      screen: Tabs,
    },
    NewTweet: {
      screen: NewTweetModal,
    },
    
  },
  {
    headerMode: 'none',
  },
  {
    cardStyle: {
      backgroundColor: '#F1F6FA',
    },
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'black',
      },
    }),
  }
);

class AppNavigator extends Component {
  render() {

    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    });
    if (!this.props.user.isAuthenticated) {
      return <AuthenticationScreen />
    }
    return <AppMainNav navigation={nav} />;
  }
}

export default connect(state => ({
  nav: state.nav,
  user: state.user,
}))(AppNavigator);

export const router = AppMainNav.router;
