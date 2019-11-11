import gql from 'graphql-tag';

export default FULL_LOCATION = gql`
    fragment fullLocation on Location {
        id
        name
        slug
        address
        city
        postcode
        state
        country
        enclosures_count
    }
`
