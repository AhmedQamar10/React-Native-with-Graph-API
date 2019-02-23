import React, { Component } from 'react';
import {Image, TouchableOpacity} from 'react-native'
import Loading from '../components/loading';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { logout } from '../actions/user';
class HeaderAvatar extends Component {
    _onOpenActionSheet = () => {
        const options = ['Logout', 'Cancel'];
        const destructiveButtonIndex = 0;
        this.props.showActionSheetWithOptions(
          {
            options,
            destructiveButtonIndex,
          },
          buttonIndex => {
            if (buttonIndex === 0) {
              this.props.client.resetStore()
              return this.props.logout();
            }
          },
        );
      };
    render() {
        if (!this.props.info) {
            return (
              <TouchableOpacity disabled>
                <Loading size="small" />
              </TouchableOpacity>
            );
          }
      return (
        <TouchableOpacity  onPress={this._onOpenActionSheet}
        hitSlop={{top:20,bottom:20,right:20,left:20}}
        style={{marginLeft:15,justifyContent:'center',
        alignItems:'center'}}>
        <Image
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
          }}
          source={{ uri: this.props.info.avatar }}
        />
        </TouchableOpacity>
      );
    }
  }
  
  export default withApollo(connect(state => ({ info: state.user.info }),{logout})(
    connectActionSheet(HeaderAvatar),
  ));

  import React from 'react';
  import {
    View, ScrollView, ActivityIndicator,
    Text, StyleSheet, FlatList
  } from 'react-native';
  import FeedCard from '../FeedCard/FeedCard';
  import { graphql, compose, withApollo } from 'react-apollo';
  import { connect } from 'react-redux';
  import getTweets from '../graphql/queries/getTweets';
  import mequery from '../graphql/queries/me';
  import subscription from '../graphql/subscriptions/tweetAdded';
  import TWEET_FAVORITED_SUBSCRIPTION from '../graphql/subscriptions/tweetFavorited';
  
  import { getUserInfo } from '../actions/user';
  
  class HomeScreen extends React.Component {
    componentWillMount() {
      this.props.data.subscribeToMore({
        document: subscription,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }
  
          const newTweet = subscriptionData.data.tweetAdded;
          if (!prev.getTweets.find(t => t._id === newTweet._id)) {
            return {
              ...prev,
              getTweets: [{ ...newTweet }, ...prev.getTweets],
            };
          }
          return prev;
        },
      });
      this.props.data.subscribeToMore({
        document: TWEET_FAVORITED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }
  
          const newTweet = subscriptionData.data.tweetFavorited;
          return {
            ...prev,
            getTweets: prev.getTweets.map(
              tweet =>
                tweet._id === newTweet._id
                  ? {
                    ...tweet,
                    favoriteCount: newTweet.favoriteCount,
                  }
                  : tweet,
            ),
          };
        },
      });
    }
    componentDidMount() {
      this._getUserInfo();
    }
    _renderPlaceholder = () => <FeedCard placeholder isLoaded={this.props.data.loading} />
  
    _getUserInfo = async () => {
      const { data: { me } } = await this.props.client.query({ query: mequery });
      this.props.getUserInfo(me);
    };
    _renderItem = ({ item }) => <FeedCard {...item} />;
    render() {
      const { data } = this.props;
      console.log(data)
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
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={{ alignSelf: 'stretch' }}
            data={data.getTweets}
            keyExtractor={item => item._id.toString()}
            renderItem={this._renderItem}
          />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: '4%',
      backgroundColor: '#f2f2f2'
    },
  });
  export default withApollo(compose(connect(undefined, { getUserInfo }),
    graphql(getTweets))(HomeScreen));