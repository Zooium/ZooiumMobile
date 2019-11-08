import gql from 'graphql-tag'

export default BASE_ENCLOSURE = gql`
    fragment baseEnclosure on Enclosure {
        id
        name
        slug
        animals_count

        location {
            id
            name
            slug
            address
            city
            postcode
        }
    }
`
