import { gql } from "@apollo/client";

export default gql`
  mutation($userInput: UserInput) {
    signup(userInput: $userInput) {
      role
    }
  }
`;
