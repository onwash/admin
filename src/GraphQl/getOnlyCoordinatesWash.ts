import gql from 'graphql-tag'

export default gql`
  query getWashCoordinates{
  getWashCoordinates{
    id
    latitude
    longitude
  }
  }
`