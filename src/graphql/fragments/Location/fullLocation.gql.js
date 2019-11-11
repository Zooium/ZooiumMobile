import gql from 'graphql-tag';

export default gql`
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
