import { merge } from 'lodash';
import parseQuery from '@utils/apollo/parseQuery.js';
import parsePagination from '@utils/apollo/parsePagination.js';

/**
 * Loads more results and merge them with the existing.
 *
 * @param {object} query The query object.
 */
export default function mergeLoadMore(query) {
    // Extract needed variables from query.
    const { loading, data, fetchMore } = query;

    // Parse the query data response.
    const { key, response } = parseQuery(data);
    const { page, hasMore } = parsePagination(response);

    // Skip if loading or has no more items to show.
    if (loading || ! hasMore) return;

    // Fetch more results.
    fetchMore({
        variables: { page: page + 1 },
        updateQuery: (previous, { fetchMoreResult: results }) => {
            // Return previous if has no results.
            if (! results || ! results[key] || ! results[key].data) {
                return previous;
            }

            // Merge the two data sources.
            let data = merge({}, results);
            data[key].data = [
                ...previous[key].data,
                ...results[key].data,
            ];

            // Return new list.
            return data;
        },
    });
}
