import { gql } from "@apollo/client";

export const CREATE_NEW_REGION = gql`
  mutation createRegion($regionInput: RegionInput) {
    createRegion(regionInput: $regionInput) {
      id
    }
  }
`;
