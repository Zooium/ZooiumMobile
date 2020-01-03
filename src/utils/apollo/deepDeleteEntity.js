/**
 * Delete apollo entity from all query cache results.
 * 
 * @credit https://github.com/apollographql/apollo-feature-requests/issues/4#issuecomment-437041503
 */
import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'
import { InMemoryCache } from 'apollo-cache-inmemory'

/**
 * Recursively delete all properties matching with the given predicate function in the given value.
 *
 * @param {Object} value
 * @param {Function} predicate
 * @return the number of deleted properties or indexes
 */
function deepDeleteAll(value, predicate) {
    let count = 0;
    if (isArray(value)) {
        value.forEach((item, index) => {
            if (predicate(item)) {
                value.splice(index, 1);
                count++;
            } else {
                count += deepDeleteAll(item, predicate);
            }
        });
    } else if (isPlainObject(value)) {
        Object.keys(value).forEach(key => {
            if (predicate(value[key])) {
                value[key] = null;
                count++;
            } else {
                count += deepDeleteAll(value[key], predicate);
            }
        });
    }

    return count;
}

/**
 * Improve InMemoryCache prototype with a function deleting an entry and all its references in cache.
 */
InMemoryCache.prototype.deepDelete = function(entry) {
    // Get entry id.
    const id = this.config.dataIdFromObject(entry);

    // Delete all entry references from cache.
    deepDeleteAll(this.data.data, ref => ref && (ref.type === 'id' && ref.id === id));

    // Delete entry from cache (and trigger UI refresh).
    this.data.delete(id);
}
