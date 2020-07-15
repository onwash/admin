import { gql } from "@apollo/client";

export default gql`
  query defaultRegion {
    defaultRegion @client {
      id
      name
      latitude
      longitude
      latitudeDelta
      longitudeDelta
    }
  }
`;
