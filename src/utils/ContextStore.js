/**
 * Hold global app contexts in store to access outside components.
 */
export default class ContextStore {
    /**
     * Holds the store items. 
     *
     * @var {object}
     */
    static store = {};

    /**
     * Returns the context from store.
     * 
     * @param {string} name
     * @return {any}
     */
    static getContext(name) {
        return ContextStore.store[name];
    }

    /**
     * Saves the context in the store.
     *
     * @param {string} name The name of the context in the store.
     * @param {any} instance The instance to be saved.
     */
    static saveContext(name, instance) {
        // Skip if missing instance.
        if (! instance) return;

        // Save context instance.
        ContextStore.store[name] = instance;
    }
}
