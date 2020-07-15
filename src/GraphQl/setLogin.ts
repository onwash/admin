import { gql } from "@apollo/client";

export default gql`
  query signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      userId
      tokenExpiration
      token
    }
  }
`;
