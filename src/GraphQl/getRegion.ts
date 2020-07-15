import gql from 'graphql-tag'

export default gql`
  query{
    getRegions{
      id
      name
      latitude
      longitude
      latitudeDelta
      longitudeDelta
    }
  }
`