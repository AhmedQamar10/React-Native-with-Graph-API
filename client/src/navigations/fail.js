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
//import ExploreScreen from '../screens/ExploreScreen';
//import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AuthenticationScreen from '../screens/AuthenticationScreen';
import NewTweetScreen from '../screens/NewTweetScreen';
import HeaderAvater from '../components/HeaderAvatar'
import ButtonHeader from '../components/ButtonHeader'

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
    /*
    Explore: {
      screen: ExploreScreen,
      navigationOptions: () => ({
        headerTitle: 'Explore',
        tabBarIcon: ({ tintColor }) =>
          <Icon size={20} color={tintColor} name="search" />,
      }),
    },
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: () => ({
        headerTitle: 'Notifications',
        tabBarIcon: ({ tintColor }) =>
          <Icon size={20} color={tintColor} name="bell" />,
      }),
    },*/
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
        headerLeft: <HeaderAvater />,
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
  {
    headerMode: 'none',
  },
);
const AppMainNav = StackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderAvater />,
        headerRight: <ButtonHeader
          onPress={() => navigation.navigate('NewTweet')} />
      })
    },
    NewTweet: {
      screen: NewTweetModal,
    },
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
