/**
 * Parses a query response into init main key and response.
 *
 * @param {object} data The raw query response.
 */
export default function parseQuery(data) {
    const key = data && Object.keys(data)[0] || undefined;
    const response = key && data && data[key] || undefined;

    return { key, response };
}
