import React, { Component } from 'react';
import {
  Platform, TextInput, Keyboard,
  View, Text, TouchableOpacity
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import CREATE_TWEET_MUTATION from '../graphql/mutations/createTweet';
import GET_TWEETS_QUERY from '../graphql/queries/getTweets';
import GET_USER_TWEETS_QUERY from '../graphql/queries/getUserTweets';

class NewTweetScreen extends Component {
  state = {
    text: '',
  };
  _onChangeText = (text) => {
    this.setState({ text });
  }
  _onCreateTweetPress = async () => {
    const {user} = this.props;
    await this.props.mutate({
      variables: {
        text: this.state.text
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createTweet: {
          __typename: 'Tweet',
          text: this.state.text,
          favoriteCount: 0,
          _id: Math.round(Math.random() * -1000000),
          createdAt: new Date(),
          isFavorited: false,
          user: {
            __typename: 'User',
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
          }
        }
      },
      update: (store, { data: { createTweet } }) => {
        const data = store.readQuery({ query: GET_USER_TWEETS_QUERY });
        if (!data.getUserTweets.find(t => t._id === createTweet._id)) {
          store.writeQuery({
            query: GET_USER_TWEETS_QUERY,
            data: { getUserTweets: [{ ...createTweet }, ...data.getUserTweets] }
          });
        }
      },
    })
    Keyboard.dismiss();
    this.props.navigation.goBack(null);
  }
  get _textLength() {
    return 140 - this.state.text.length;
  }
  get _buttonDisabled() {
    return this.state.text.length < 5;
  }

  render() {
    return (
      <View style={{
        backgroundColor: 'white', flex: 1,
        alignItems: 'center'
      }}>
        <View style={{
          position: 'relative',
          height: '80%',
          width: '90%', paddingTop: 5,
        }}>
          <TextInput multiline={true} placeholder='What is happening?'
            selectionColor='red' autoFocus={true} maxLength={140}
            value={this.state.text} onChangeText={this._onChangeText}
            style={{
              fontSize: 18, height: '15%', color: 'black',
              width: '100%'
            }} />
          <Text style={{
            fontSize: 18, color: '#00a8ff',
            position: 'absolute', top: '45%', right: '5%'
          }}>{this._textLength}</Text>
          <TouchableOpacity disabled={this._buttonDisabled}
          onPress={this._onCreateTweetPress}
            hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
            style={{
              backgroundColor: '#00a8ff', width: 80, height: 40,
              justifyContent: 'center', alignItems: 'center',
              borderRadius: 20, position: 'absolute', top: '60%',
              right: 0
            }}>
            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>Tweet</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default compose(graphql(CREATE_TWEET_MUTATION),
connect(state => ({ user: state.user.info }))
)(NewTweetScreen);
