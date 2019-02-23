import gql  from 'graphql-tag';

export default gql`
  {
    me {
      avatar
      username
      firstName
      lastName
    }
  }
`;