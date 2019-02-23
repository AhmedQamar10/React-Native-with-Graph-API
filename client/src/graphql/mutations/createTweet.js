import gql from 'graphql-tag';
import FeedCard from '../../FeedCard/FeedCard';

export default gql`
  mutation createTweet($text: String!) {
    createTweet(text: $text) {
        ...FeedCard
      }
    }${FeedCard.fragments.tweet}
`;
