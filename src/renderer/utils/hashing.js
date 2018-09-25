
/**
 * Hashing object to b64 string
 *
 * @param object
 * @returns {string}
 */
const hashing = (object) => btoa(JSON.stringify(object));


/**
 * Parse hashed string to object
 *
 * @param string
 * @returns {any}
 */
const parsing = (string) => JSON.parse(atob(string));



export {
    hashing,
    parsing
}
