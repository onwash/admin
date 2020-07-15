import gql from 'graphql-tag'

export default gql`
  mutation($userInput:UserInput){
    signup(userInput:$userInput){
      role
    }
  }
`