/**
 * Parses a pagination response into init status, page number, list data, and has more.
 *
 * @param {object} response The parsed query response.
 */
export default function parsePagination(response) {
    const init = ! response || ! response.data;
    const page = ! init ? Math.ceil(response.data.length / response.per_page) : 1;
    const list = response && response.data || undefined;
    const hasMore = ! init && response.total > (response.per_page * page);

    return { init, page, list, hasMore };
}
