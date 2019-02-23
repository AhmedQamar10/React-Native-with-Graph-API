import React from 'react';
import { UIManager, AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { store, client } from './src/store';
import { AppLoading } from 'expo';
import { login } from './src/actions/user';
import AppNavigation from './src/navigations/navigations';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
//import HomeScreen from './src/screens/HomeScreen';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends React.Component {
  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this._checkIfToken();
  }

  _checkIfToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@twitteryoutubeclone');
      if (token != null) {
        store.dispatch(login());
      }
    } catch (error) {
      throw error;
    }

    this.setState({ appIsReady: true });
  };

  render() {
    if (!this.state.appIsReady) {
      return <AppLoading />;
    }
    return (
      <ApolloProvider store={store} client={client}>
        <ActionSheetProvider>
          <AppNavigation />
        </ActionSheetProvider>
      </ApolloProvider>
    );
  }
}