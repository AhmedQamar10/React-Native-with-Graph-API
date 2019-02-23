import User from '../../models/User';
import FavoriteTweet from '../../models/FavoriteTweet';
import { requireAuth } from '../../services/auth';

export default {
    signup: async (_, args) => {
        console.log(args);
        const foundUser = await User.findOne({ username: args.username }).exec();
        if (foundUser) {
            throw new Error('User already exits');
        }
        const user = await new User(args).save();
        await FavoriteTweet.create({ userId: user._id });
        return {
            token: user.createToken()
        };
    },
    login: async (_, { email, password }) => {
        try {
            const user = await User.findOne({ email });

            if (!user) {
                return{
                    error:{
                        field:'email',
                        msg:'User not exist!'
                    }
                }
            }

            if (!user.authenticateUser(password)) {
                return{
                    error:{
                        field:'password',
                        msg:'Password not match!'
                    }
                }
            }
            
            return {
                payload:{token: user.createToken(),}
            };
        } catch (error) {
            throw error;
        }
    },
    me: async (_, args, { user }) => {
        try {
            const me = await requireAuth(user);

            return me;
        } catch (error) {
            throw error;
        }
    },
}
/*
import FollowingUser from '../../models/FollowingUser';

*/
