import gql from 'graphql-tag';

export default gql`
  mutation favoriteTweet($_id: ID!) {
    favoriteTweet(_id: $_id) {
      isFavorited
      favoriteCount
      _id
    }
  }
`;