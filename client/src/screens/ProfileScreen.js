import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import {FlatList} from 'react-native'
import ProfileHeader from '../components/ProfileHeader';
import FeedCard from '../FeedCard/FeedCard';
import GET_USER_TWEETS_QUERY from '../graphql/queries/getUserTweets';
import Header2Avater from '../components/Header2Avatar'

class ProfileScreen extends Component {
  state = {}
  _renderItem = ({ item }) => <FeedCard {...item} />

  _renderPlaceholder = () => (
    <FeedCard
      placeholder
      isLoaded={this.props.data.loading} />
  )
  render() {
    const { info, data } = this.props;
    if (data.loading) {
      return (
        <FlatList
          contentContainerStyle={{ alignSelf: 'stretch' }}
          data={[1,2,3,4,5,6,7,8,9,10,
            11,12,13,14,15,16,17,18,19,20]}
          keyExtractor={item => item.toString()}
          renderItem={this._renderPlaceholder}
        />
      )
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#f1f6fa' }}>
      <Header2Avater {...this.props}/>
      <View style={{paddingTop:'2%'}}></View>
        <ProfileHeader {...info} />
        <View style={{paddingTop:'2%'}}></View>
        <FlatList
            data={data.getUserTweets}
            renderItem={this._renderItem}
            keyExtractor={item => item._id.toString()}
            contentContainerStyle={{ alignSelf: 'stretch' }}
          />
      </View>
    );
  }
}
export default compose(
  graphql(GET_USER_TWEETS_QUERY),
  connect(state => ({ info: state.user.info }),
  ))(ProfileScreen);