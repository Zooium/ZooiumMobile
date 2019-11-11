import gql from 'graphql-tag';

export default BASE_LOCATION = gql`
    fragment baseLocation on Location {
        id
        name
        slug
        address
        city
        postcode
    }
`
