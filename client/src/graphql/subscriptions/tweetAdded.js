import gql from 'graphql-tag';
import FeedCard from '../../FeedCard/FeedCard';

export default gql`
subscription{
  tweetAdded{
    ...FeedCard
  }
}${FeedCard.fragments.tweet}
`;