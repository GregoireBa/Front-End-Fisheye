/**
 * Fetches data from a JSON file and returns the parsed data.
 * @param {string} url - The URL to the JSON file.
 * @returns {Promise<any>} The parsed JSON data.
 */
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Could not fetch data: ", error);
        throw error;
    }
}

/**
 * Retrieves the list of all photographers from the JSON file.
 * @returns {Promise<Array>} A promise that resolves to an array of photographer objects.
 */
async function getPhotographers() {
    return fetchData('./data/photographers.json').then(data => data.photographers);
}

/**
 * Retrieves media for a specific photographer by their ID.
 * @param {number} photographerId - The ID of the photographer.
 * @returns {Promise<Array>} A promise that resolves to an array of media objects for the given photographer.
 */
async function getMediaByPhotographerId(photographerId) {
    return fetchData('./data/photographers.json').then(data => 
        data.media.filter(media => media.photographerId === photographerId)
    );
}

export { getPhotographers, getMediaByPhotographerId };
