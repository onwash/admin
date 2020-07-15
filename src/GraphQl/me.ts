import gql from 'graphql-tag'


export default gql`
  query {
    me{
      email
      login
      region {
        name
        latitude
        longitude
        latitudeDelta
        longitudeDelta
      }
  }
}
`