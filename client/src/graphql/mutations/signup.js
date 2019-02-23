import gql from 'graphql-tag';

export default gql`
mutation signup(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $username: String!
    $avatar: String
  )
{
  signup(username:$username,email:$email,
    firstName:$firstName,lastName:$lastName,
    password:$password,avatar:$avatar)
  {
    token
  }
}
`;
