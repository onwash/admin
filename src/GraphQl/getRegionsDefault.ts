import gql from 'graphql-tag'

export default gql`
    query defaultRegion{
      defaultRegion @client {
      id
      name
      latitude
      longitude
      latitudeDelta
      longitudeDelta
    }
  }
`