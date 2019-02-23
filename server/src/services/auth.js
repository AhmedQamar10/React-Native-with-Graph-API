import jwt from 'jsonwebtoken';
import User from '../models/User';

export async function requireAuth(user) {
  if (!user || !user._id) {
    throw new Error('Unauthorized!');
  }

  const me = await User.findById(user._id);

  if (!me) {
    throw new Error('Unauthorized!');
  }

  return me;
}

function decodeToken(token) { 
  const arr = token.split(' ');

  if (arr[0] === 'Bearer') {
    return jwt.verify(arr[1], 'somesupersecretkey');
  }

  throw new Error('Token not valid!');
}

export async function auth(req, res, next) {
    try {
      const token = req.headers.authorization;
      if (token != null) {
        const user = await decodeToken(token);
        req.user = user;
      } else {
        req.user = null;
      }
      return next();
    } catch (error) {
      throw error;
    }
  }
