import gql from 'graphql-tag';

import FeedCard from '../../FeedCard/FeedCard';

export default gql`
{
  getUserTweets {
    ...FeedCard
  }
}
${FeedCard.fragments.tweet}
`;