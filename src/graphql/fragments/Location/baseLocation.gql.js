import gql from 'graphql-tag';

export default gql`
    fragment baseLocation on Location {
        id
        name
        slug
        address
        city
        postcode
    }
`
