import gql from 'graphql-tag';

import FeedCard from '../../FeedCard/FeedCard';

export default gql`
{
  getTweets {
    ...FeedCard
  }
}
${FeedCard.fragments.tweet}
`;