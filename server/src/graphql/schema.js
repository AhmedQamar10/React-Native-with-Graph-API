export default `
  scalar Date
  type Status {
    message: String!
  }
  type Auth {
    token: String!
  }
  type User {
    _id: ID!
    username: String
    email: String!
    firstName: String
    lastName: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }
  type Me {
    _id: ID!
    username: String
    email: String!
    firstName: String
    lastName: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }
  type Tweet {
    _id: ID!
    text: String!
    user: User!
    favoriteCount: Int!
    isFavorited: Boolean
    createdAt: Date!
    updatedAt: Date!
  }
  type Query {
    getTweet(_id: ID!): Tweet
    getTweets: [Tweet]
    getUserTweets: [Tweet]
    me: Me
  }
  type Mutation {
    createTweet(text: String!): Tweet

    updateTweet(_id: ID!, text: String): Tweet
    updateUserTweet(_id: ID!, text: String): Tweet

    deleteTweet(_id: ID!): Status
    deleteUserTweet(_id: ID!): Status

    favoriteTweet(_id: ID!): Tweet
    signup(email: String!, firstName: String!,lastName: String, 
    password: String!, avatar: String, username: String): Auth
    login(email: String!, password: String!): LoginResponse
  }
  type Subscription {
    tweetAdded: Tweet
    tweetFavorited: Tweet
  }
  type Error{
    field:String!
    msg:String!
  }

  type LoginResponse{
    payload:Auth
    error: Error
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
