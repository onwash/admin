import { gql } from "@apollo/client";

export default gql`
  query getAllUsers {
    getAllUsers {
      role
      email
      login
      phonenumber
      comments
      created_at
      region {
        name
      }
      settings {
        mapSettings {
          selected
        }
      }
    }
  }
`;
