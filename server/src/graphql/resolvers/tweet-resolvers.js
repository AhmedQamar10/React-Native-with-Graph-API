import Tweet from '../../models/Tweet';
import { requireAuth } from '../../services/auth';
import { pubsub } from '../../pubsub';
import FavoriteTweet from '../../models/FavoriteTweet';

export default {
    getTweets: async (_, args, { user }) => {
        try {
            await requireAuth(user);
            //return Tweet.find({}).sort({ createdAt: -1 });
            const p1 = Tweet.find({}).sort({ createdAt: -1 });
            const p2 = FavoriteTweet.findOne({ userId: user._id });
            const [tweets, favorites] = await Promise.all([p1, p2]);

            const tweetsToSend = tweets.reduce((arr, tweet) => {
                const tw = tweet.toJSON();

                if (favorites.tweets.some(t => t.equals(tweet._id))) {
                    arr.push({
                        ...tw,
                        isFavorited: true,
                    });
                } else {
                    arr.push({
                        ...tw,
                        isFavorited: false,
                    })
                }
                return arr;
            }, []);
            return tweetsToSend;
        }
        catch (error) {
            throw error
        }
    },
    getTweet: async (_, { _id }, { user }) => {
        try {
            await requireAuth(user);
            return Tweet.findById(_id);
        } catch (error) {
            throw error;
        }
    },
    createTweet: async (_, args, { user }) => {
        try {
            await requireAuth(user);
            const tweet = await Tweet.create({ ...args, user: user._id });
            pubsub.publish('tweetAdded', { ['tweetAdded']: tweet });

            return tweet;
        } catch (error) {
            throw error;
        }
    },
    updateTweet: async (_, { _id, ...rest }, { user }) => {
        try {
            await requireAuth(user);
            const tweet = await Tweet.findByIdAndUpdate(_id, rest, { new: true });
            pubsub.publish('tweetAdded', { ['tweetAdded']: tweet });

            return tweet.save();
        } catch (error) {
            throw error;
        }
    },
    deleteTweet: async (_, { _id }, { user }) => {
        try {
            await requireAuth(user);
            await Tweet.findByIdAndRemove(_id);
            return {
                message: 'Delete Success!'
            }
        } catch (error) {
            throw error;
        }
    },
    updateUserTweet: async (_, { _id, ...rest }, { user }) => {
        try {
            await requireAuth(user);
            const tweet = await Tweet.findOne({ _id, user: user._id });

            if (!tweet) {
                throw new Error('Not found!');
            }

            Object.entries(rest).forEach(([key, value]) => {
                tweet[key] = value;
            });
            pubsub.publish('tweetAdded', { ['tweetAdded']: tweet });
            return tweet.save();
        } catch (error) {
            throw error;
        }
    },
    deleteUserTweet: async (_, { _id }, { user }) => {
        try {
            await requireAuth(user);
            const tweet = await Tweet.findOne({ _id, user: user._id });

            if (!tweet) {
                throw new Error('Not found!');
            }
            await tweet.remove();
            return {
                message: 'Delete Success!'
            }
        } catch (error) {
            throw error;
        }
    },
    getUserTweets: async (_, args, { user }) => {
        try {
            await requireAuth(user);
            //return Tweet.find({ user: user._id }).sort({ createdAt: -1 })
            const p1 = Tweet.find({ user: user._id }).sort({ createdAt: -1 });
            const p2 = FavoriteTweet.findOne({ userId: user._id });
            const [tweets, favorites] = await Promise.all([p1, p2]);

            const tweetsToSend = tweets.reduce((arr, tweet) => {
                const tw = tweet.toJSON();

                if (favorites.tweets.some(t => t.equals(tweet._id))) {
                    arr.push({
                        ...tw,
                        isFavorited: true,
                    });
                } else {
                    arr.push({
                        ...tw,
                        isFavorited: false,
                    })
                }
                return arr;
            }, []);
            return tweetsToSend;
        }
        catch (error) {
            throw error
        }
    },

    tweetAdded: {
        subscribe: () => pubsub.asyncIterator('tweetAdded')
    },

    favoriteTweet: async (_, { _id }, { user }) => {
        try {
            await requireAuth(user);
            const favorites = await FavoriteTweet.findOne({ userId: user._id });
            return favorites.userFavoritedTweet(_id);
        } catch (error) {
            throw error;
        }
    },
    tweetFavorited: {
        subscribe: () => pubsub.asyncIterator('tweetFavorited'),
    }

}
