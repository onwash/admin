import { gql } from "@apollo/client";

export default gql`
  query {
    me {
      email
      login
      region {
        name
        latitude
        longitude
        latitudeDelta
        longitudeDelta
      }
    }
  }
`;
