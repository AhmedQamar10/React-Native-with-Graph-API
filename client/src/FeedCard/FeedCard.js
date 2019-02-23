import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { graphql, gql } from 'react-apollo';
import FeedCardHeader from './FeedCardHeader';
import FeedCardBottom from './FeedCardBottom';
import FAVORITE_TWEET_MUTATION from '../graphql/mutations/favoriteTweet';
import Placeholder from 'rn-placeholder';

function FeedCard({ text,user,createdAt,
    favoriteCount,favorite,isFavorited,placeholder,isLoaded }) {
        if (placeholder) {
            return (
              <View>
                <Placeholder.ImageContent
                  onReady={!isLoaded}
                  lineNumber={2}
                  animate="shine"
                  lastLineWidth="40%"
                >
                  <View style={{flex:1}}></View>
                </Placeholder.ImageContent>
              </View>
            )
          }
    return (
        <View style={styles.container}>
            <FeedCardHeader {...user} createdAt={createdAt}/>
            <View style={{
                flex: 1, backgroundColor: 'white',
                paddingTop: "1%", paddingLeft: "1%"
            }}>
                <Text style={{
                    fontSize: 20, textAlign: "left"
                    , fontWeight: 'bold', color: '#444B52'
                }}>{text}</Text>
            </View>
            <FeedCardBottom favoriteCount={favoriteCount}
            onFavoritePress={favorite} isFavorited={isFavorited}/>
        </View>
    );
}

FeedCard.fragments = {
  tweet: gql`
    fragment FeedCard on Tweet {
      text
      _id
      createdAt
      isFavorited
      favoriteCount
      user {
        username
        avatar
        lastName
        firstName
      }
    }
  `
  }

const styles = StyleSheet.create({
    container: {
        minHeight: 180,
        backgroundColor: '#fff',
        width: '100%',
        padding: '1%',
        shadowColor: "#444B52",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        marginVertical: 5,
    },
});

export default graphql(FAVORITE_TWEET_MUTATION, {
    props: ({ ownProps, mutate }) => ({
      favorite: () =>
        mutate({
          variables: { _id: ownProps._id },
          optimisticResponse: {
            __typename: 'Mutation',
            favoriteTweet: {
              __typename: 'Tweet',
              _id: ownProps._id,
              favoriteCount: ownProps.isFavorited
                ? ownProps.favoriteCount - 1
                : ownProps.favoriteCount + 1,
              isFavorited: !ownProps.isFavorited,
            },
          },
        }),
    }),
  })(FeedCard);