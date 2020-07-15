import { gql } from "@apollo/client";

export default gql`
  query {
    getRegions {
      id
      name
      latitude
      longitude
      latitudeDelta
      longitudeDelta
    }
  }
`;
