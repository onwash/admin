import gql from 'graphql-tag'

export default gql`
  query signin($email: String!, $password: String!){
    signin(email:$email , password: $password){
      userId
      tokenExpiration
      token
  }
}
`