import TweetResolvers from './tweet-resolvers';
import UserResolvers from './user-resolvers';
import User from '../../models/User';
import GraphQLDate from 'graphql-date';

export default {
    Date: GraphQLDate,
    Tweet: {
        user: ({ user }) => User.findById(user),
    },
    Query: {
        getTweets: TweetResolvers.getTweets,
        getTweet: TweetResolvers.getTweet,
        getUserTweets: TweetResolvers.getUserTweets,
        me: UserResolvers.me
    },
    Mutation: {
        createTweet: TweetResolvers.createTweet,
        updateTweet: TweetResolvers.updateTweet,
        deleteTweet: TweetResolvers.deleteTweet,

        updateUserTweet: TweetResolvers.updateUserTweet,
        deleteUserTweet: TweetResolvers.deleteUserTweet,
        favoriteTweet: TweetResolvers.favoriteTweet,
        signup: UserResolvers.signup,
        login: UserResolvers.login
    },
    Subscription: {
        tweetAdded: TweetResolvers.tweetAdded,
        tweetFavorited: TweetResolvers.tweetFavorited
    }
}
