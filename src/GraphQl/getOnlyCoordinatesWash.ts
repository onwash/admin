import { gql } from "@apollo/client";

export default gql`
  query getWashCoordinates {
    getWashCoordinates {
      id
      latitude
      longitude
    }
  }
`;
