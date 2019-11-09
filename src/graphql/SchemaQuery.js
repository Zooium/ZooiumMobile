const fs = require('fs');
const fetch = require('node-fetch');

// Query types from GraphQL endpoint.
fetch('https://app.zooium.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            variables: {},
            query: `{
                __schema {
                    types {
                        kind
                        name
                        possibleTypes {
                            name
                        }
                    }
                }
            }`,
        }),
    })
    .then(result => result.json().then(result => {
        // Filter out non union/interface types.
        result.data.__schema.types = result.data.__schema.types
            .filter(type => type.possibleTypes !== null);

        // Write fragment types to JSON file.
        fs.writeFileSync('./src/graphql/FragmentTypes.json', JSON.stringify(result.data), error => {
            if (error) {
                console.error('Couldn\'t save fragment types: ', error);
            } else {
                console.log('Fragment types saved!');
            }
        });
    }));
