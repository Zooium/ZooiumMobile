/**
 * Allows Apollo cache updating via callback.
 *
 * @param {object} cache The cache provider.
 * @param {object} query The query definition.
 * @param {object} variables The query variables.
 * @param {Closure} callback The callback closure.
 */
export default function updateCache(cache, query, variables, callback) {
    // Read query from cache.
    let data = cache.readQuery({
        query, variables
    });

    // Callback to allow data update.
    data = callback(data);

    // Write new query data to cache.
    cache.writeQuery({
        data, query, variables
    });
}
