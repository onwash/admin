import gql from 'graphql-tag'

export const CREATE_NEW_REGION = gql`
  mutation createRegion($regionInput  : RegionInput){
    createRegion(regionInput:$regionInput){
      id
    }
  }
`
